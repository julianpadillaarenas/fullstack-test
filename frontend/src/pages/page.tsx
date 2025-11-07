import { useEffect, useState } from 'react';
import CreateRequestForm from '../components/CreateRequestForm';
import RequestCard from '../components/RequestCard';
import Header from '../components/Headers';
import { useRequests } from '../hooks/useRequest';
import RequestDetail from '../components/RequestDetails';
import { useAuth } from '../hooks/useAuth';

export default function Page() {
  const { currentUser: user, findAllUsers, users } = useAuth();
  const { requests = [], refetch, loading: loadingRequests, fetchAllPending, pendingRequests = [] } = useRequests();
  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => { findAllUsers(); }, [findAllUsers]);

  useEffect(() => {
    if (!user?.id) return;
    refetch(user.id);
    fetchAllPending(user.id);
  }, [user?.id, refetch, fetchAllPending]);

  async function handleCreated() {
    try {
      await refetch?.(user.id);
      if (user?.id && typeof fetchAllPending === 'function') {
        await fetchAllPending(user.id);
      }
    } catch (e) {
      console.error('Error refrescando después de crear', e);
    }
  }
  
  function handleOpen(r: any) { setSelected(r); }
  
  async function handleUpdated(r: any) {
    setSelected(r);
    // refetch para sincronizar cambios
    try {
      await refetch?.();
      if (user?.id && typeof fetchAllPending === 'function') {
        await fetchAllPending(user.id);
      }
    } catch (e) {
      console.error('Error refrescando después de actualizar', e);
    }
  }

  if (!user || !users) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="text-slate-600">No hay usuarios configurados.</div>
          <div className="text-sm text-slate-400 mt-2">Verifica la carga de usuarios o contacta al administrador.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <main className="p-6 max-w-6xl mx-auto grid grid-cols-3 gap-6">
        <div className="col-span-1 space-y-4">
          <CreateRequestForm onCreated={handleCreated} />
          <div className="p-4 bg-white rounded shadow">
            <h4 className="font-semibold">Notificaciones</h4>
            <div className="mt-2 text-sm">Tienes <strong>{pendingRequests.length}</strong> solicitudes pendientes.</div>
          </div>
        </div>

        <div className="col-span-2">
          <section className="mb-4">
            <h4 className="font-semibold mb-2">Pendientes para Aprobar</h4>

            {loadingRequests ? (
              <div className="p-4 text-slate-500">Cargando solicitudes...</div>
            ) : pendingRequests.length === 0 ? (
              <div className="p-2 text-sm text-slate-500">No tienes solicitudes pendientes</div>
            ) : (
              <div className="grid gap-2">
                {pendingRequests.map((r: any) => <RequestCard key={r.id} r={r} onOpen={handleOpen} />)}
              </div>
            )}
          </section>

          <section>
            <h4 className="font-semibold mb-2">Mis Solicitudes</h4>
            <div className="grid gap-2">
              {requests.map(r => <RequestCard key={r.id} r={r} onOpen={handleOpen} />)}
            </div>
          </section>
        </div>
      </main>

      <RequestDetail request={selected} onClose={() => setSelected(null)} onUpdated={handleUpdated} />
    </div>
  );
}
