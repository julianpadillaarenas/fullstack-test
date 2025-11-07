import type { PrimitiveAuthorizationRequest } from '../types/models';

export default function RequestCard({ r, onOpen }: { r: PrimitiveAuthorizationRequest; onOpen: (r: PrimitiveAuthorizationRequest) => void }) {
  return (
    <div onClick={() => onOpen(r)} className="p-3 border rounded hover:shadow cursor-pointer bg-white">
      <div className="flex justify-between">
        <div>
          <div className="font-semibold">{r.title}</div>
          <div className="text-sm text-slate-600">{r.typeOfRequest} • {r.id}</div>
        </div>
        <div className="text-right">
          <div className="text-xs">{r.createdAt ? new Date(r.createdAt).toLocaleString() : '-'}</div>
          <div className="mt-2">
            {r.status === 'pending' ? <span className="text-xs px-2 py-1 rounded bg-amber-100 text-amber-800">Pendiente</span>
              : r.status === 'approve' ? <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800">Aprobado</span>
              : <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-800">Denegado</span>}
          </div>
        </div>
      </div>
    </div>
  );
}