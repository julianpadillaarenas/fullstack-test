import { create } from 'zustand';
import type { PrimitiveAuthorizationRequest } from '../types/models';
import * as api from '../services/api';
import { useUIStore } from './UIStore';
import { useAuthStore } from './authStore';


type RequestState = {
  items: PrimitiveAuthorizationRequest[];
  loading: boolean;
  error: any | null;

  fetchAll: () => Promise<void>;
  refetch: () => Promise<void>;
  getById: (id: string) => PrimitiveAuthorizationRequest | undefined;

  create: (payload: Omit<PrimitiveAuthorizationRequest, 'id' | 'history' | 'createdAt' | 'updatedAt'>) => Promise<PrimitiveAuthorizationRequest | null>;
  action: (id: string, action: 'approve' | 'deny', actionUserId: string, commentary: string) => Promise<PrimitiveAuthorizationRequest | null>;

  setItems: (items: PrimitiveAuthorizationRequest[]) => void;

};


export const useRequestStore = create<RequestState>((set, get) => ({
  items: [],
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true, error: null });
    const userId = useAuthStore.getState().currentUser?.id ?? ""
    try {
      const data = await api.listRequests(userId); //requiero el userID aqui
      set({ items: data, loading: false });
    } catch (e) {
      set({ error: e, loading: false });
    }
  },

  refetch: async () => {
    await get().fetchAll();
  },

  getById: (id: string) => {
    return get().items.find((x) => x.id === id);
  },

  create: async (payload) => {
    set({ loading: true, error: null });
    try {
      const created = await api.createRequest(payload);
      // prepend to items
      set((s) => ({ items: [created, ...s.items], loading: false }));
      // notify UI
      useUIStore.getState().showToast('Solicitud creada');
      return created;
    } catch (e) {
      set({ error: e, loading: false });
      useUIStore.getState().showToast('Error creando solicitud');
      return null;
    }
  },

  action: async (id, action, actionUserId, commentary) => {
    set({ loading: true, error: null });
    try {
      const updated = await api.actionRequest(id, action, actionUserId, commentary);
      // update local list
      set((s) => ({
        items: s.items.map((it) => (it.id === id ? updated : it)),
        loading: false,
      }));
      useUIStore.getState().showToast(action === 'approve' ? 'Solicitud aprobada' : 'Solicitud denegada');
      return updated;
    } catch (e) {
      set({ error: e, loading: false });
      useUIStore.getState().showToast('Error al procesar acción');
      return null;
    }
  },

  setItems: (items) => set({ items }),
}));