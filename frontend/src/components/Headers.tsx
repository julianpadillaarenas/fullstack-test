import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const { currentUser:user, users, setCurrentUser} = useAuth();

  return (
    <header className="flex items-center justify-between p-4 bg-slate-900 text-white">
      <div>
        <h1 className="text-xl font-semibold">Aprobaciones • CoE</h1>
        <div className="text-sm opacity-80">Flujo Genérico de Aprobación</div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-sm">Usuario:</div>
        <select className="bg-slate-800 p-2 rounded" value={user?.id} onChange={(e) => setCurrentUser(e.target.value)}>
          {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>
      </div>
    </header>
  );
}