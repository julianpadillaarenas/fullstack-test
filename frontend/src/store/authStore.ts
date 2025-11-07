// src/store/authStore.ts
import { create } from 'zustand';
import { listUsers as apiListUsers } from '../services/api'; // si no existe, ajusta o remueve
import type { PrimitiveUser } from '../types/models';

type AuthState = {
  users: PrimitiveUser[];
  currentUser: PrimitiveUser | null;
  loading: boolean;
  error: any | null;

  // actions
  findAllUsers: () => Promise<void>;
  setCurrentUser: (id: string) => void;
  clearCurrentUser: () => void;
  getUserById: (id: string) => PrimitiveUser | undefined;
};



export const useAuthStore = create<AuthState>((set, get) => ({
  users: [],
  currentUser: null,
  loading: false,
  error: null,

  // intenta obtener usuarios desde el backend (listUsers).
  // Si falla o no hay respuesta, cae a demoUsers.
  findAllUsers: async () => {
    set({ loading: true, error: null });
    try {
      const res = await apiListUsers();
      set({ users: res, currentUser: res[0], loading: false });
    } catch (e) {
      set({ error: e, loading: false });
    }
  },

  setCurrentUser: (id: string) => {
    const user = get().users.find((u) => u.id === id) ?? null;
    set({ currentUser: user });
  },

  clearCurrentUser: () => {
    set({ currentUser: null });
  },

  getUserById: (id: string) => {
    return get().users.find((u) => u.id === id);
  },
}));