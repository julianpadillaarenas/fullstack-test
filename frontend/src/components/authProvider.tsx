import React from "react";
import { useAuthStore } from "../store/authStore";

/**
 * AuthProvider
 * - Componente de compatibilidad que no crea contexto nuevo (Zustand es global).
 * - Útil para mantener el tree structure que tu app espera.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Opcional: podrías precargar usuarios aquí si quieres
  React.useEffect(() => {
    // prefetch users on provider mount (non-blocking)
    useAuthStore.getState().findAllUsers().catch(() => {});
  }, []);

  return <>{children}</>;
}