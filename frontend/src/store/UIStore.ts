import {create} from 'zustand';

type Toast = { id: string; message: string } | null;

type UIState = {
  selectedRequestId: string | null;
  openRequest: (id: string | null) => void;

  toast: Toast;
  showToast: (msg: string) => void;
  hideToast: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  selectedRequestId: null,
  openRequest: (id) => set({ selectedRequestId: id }),

  toast: null,
  showToast: (message) => {
    const id = String(Date.now());
    set({ toast: { id, message } });
    // auto hide after 3s
    setTimeout(() => set({ toast: null }), 3000);
  },
  hideToast: () => set({ toast: null }),
}));
