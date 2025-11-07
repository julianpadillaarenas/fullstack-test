import { useState } from 'react';
import type { PrimitiveAuthorizationRequest } from '../types/models';
import { useAuth } from '../hooks/useAuth';
import * as api from '../services/api';


export default function RequestDetail({ request, onClose, onUpdated }: { request: PrimitiveAuthorizationRequest | null; onClose: () => void; onUpdated?: (r: PrimitiveAuthorizationRequest) => void; }) {
  const { users, currentUser:user } = useAuth();
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  if (!request) return null;

  const canAct = request.responsibleUserId === user.id && request.status === 'pending';

  async function handle(action: 'approve' | 'denied') {
    if (!canAct) return;
    setLoading(true);
    try {
      const updated = await api.actionRequest(request.id!, action, user.id, comment || (action === 'approve' ? 'Aprobado' : 'Denegado'));
      onUpdated?.(updated);
      alert(action === 'approve' ? 'Aprobada' : 'Denegada');
    } catch (e: any) {
      console.error(e);
      alert('Error: ' + (e?.data?.message ?? e?.message));
    } finally {
      setLoading(false);
    }
  }

  const getNameById  = (userId:string)=>{
    return users.find(u=>u.id === userId)?.name
  }
    
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-xl font-semibold">{request.title}</div>
            <div className="text-sm text-slate-600">ID: {request.id}</div>
          </div>
          <div>
            <button onClick={onClose} className="px-3 py-1 border rounded">Cerrar</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium">Detalles</h5>
            <p className="text-sm text-slate-700">{request.description}</p>
            <ul className="mt-3 text-sm space-y-1">
              <li><strong>Solicitante:</strong> {getNameById(request.requestingUserId)}</li>
              <li><strong>Responsable:</strong> {getNameById(request.responsibleUserId)}</li>
              <li><strong>Tipo:</strong> {request.typeOfRequest}</li>
              <li><strong>Estado:</strong> {request.status}</li>
            </ul>
          </div>

          <div>
            <h5 className="font-medium">Histórico</h5>
            <div className="max-h-48 overflow-auto text-sm border rounded p-2 bg-slate-50">
              {request.history?.length ? request.history.map((h) => (
                <div key={h.id} className="mb-2">
                  <div className="text-xs text-slate-500">{new Date(h.date).toLocaleString()} • {h.actionUserId} • {h.status}</div>
                  <div className="text-sm">{h.commentary}</div>
                </div>
              )) : <div className="text-sm text-slate-500">Sin histórico</div>}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h5 className="font-medium">Acción</h5>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Comentario (opcional)" className="w-full p-2 border rounded h-24" />
          <div className="flex gap-2 mt-3 justify-end">
            {canAct ? (
              <>
                <button disabled={loading} onClick={() => handle('denied')} className="px-4 py-2 border rounded">Rechazar</button>
                <button disabled={loading} onClick={() => handle('approve')} className="px-4 py-2 bg-green-600 text-white rounded">Aprobar</button>
              </>
            ) : <div className="text-sm text-slate-500">No puedes procesar esta solicitud.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}