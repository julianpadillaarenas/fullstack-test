import { useAuthStore } from '../store/authStore';

export function useAuth() {
  const user = useAuthStore((s) => s.currentUser);
  const users = useAuthStore((s) => s.users);
  const findAllUsers = useAuthStore((s) => s.findAllUsers);
  const setCurrentUser = useAuthStore((s) => s.setCurrentUser);
  const clearCurrentUser = useAuthStore((s) => s.clearCurrentUser);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);

  return {
    currentUser: user,
    user, // alias (compatibilidad)
    users,
    findAllUsers,
    setCurrentUser,
    clearCurrentUser,
    loading,
    error,
  };
}

