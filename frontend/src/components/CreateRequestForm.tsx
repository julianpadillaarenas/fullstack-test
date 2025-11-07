import React, { useState } from 'react';
import * as api from '../services/api';
import type { AuthorizationRequestTypeOfRequest, AuthorizationRequestStatus, PrimitiveAuthorizationRequest } from '../types/models';
import { useAuth } from '../hooks/useAuth';

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default function CreateRequestForm({ onCreated }: { onCreated?: (r: PrimitiveAuthorizationRequest) => void }) {
  const { currentUser: user, users } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [responsibleId, setResponsibleId] = useState<string>(users.find(u => u.id !== user.id)!.id);
  const [type, setType] = useState<AuthorizationRequestTypeOfRequest>('deployment' as AuthorizationRequestTypeOfRequest);
  const [loading, setLoading] = useState(false);

  if(!user) return

  function validate() {
    if (title.trim().length < 5) return 'El título debe tener al menos 5 caracteres';
    if (description.trim().length < 10) return 'La descripción debe tener al menos 10 caracteres';
    if (!uuidRegex.test(user.id)) return 'Usuario solicitante inválido';
    if (!uuidRegex.test(responsibleId)) return 'Responsable inválido';
    if (responsibleId === user.id) return 'El responsable no puede ser el mismo solicitante';
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) return alert(err);
    setLoading(true);
    try {
      const payload: Omit<PrimitiveAuthorizationRequest, 'id' | 'history' | 'createdAt' | 'updatedAt'> = {
        title,
        description,
        requestingUserId: user.id,
        responsibleUserId: responsibleId,
        typeOfRequest: type,
        status: 'pending' as AuthorizationRequestStatus,
      };
      const created = await api.createRequest(payload);
      setTitle(''); setDescription('');
      onCreated?.(created);
      alert('Solicitud creada');
    } catch (e: any) {
      console.error(e);
      alert('Error al crear: ' + (e?.data?.message ?? e?.message ?? 'unknown'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow space-y-3">
      <h3 className="font-semibold">Crear solicitud</h3>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" className="w-full p-2 border rounded" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" className="w-full p-2 border rounded h-28" />
      <div className="flex gap-2">
        <select value={responsibleId} onChange={(e) => setResponsibleId(e.target.value)} className="p-2 border rounded">
          {users.filter(u => u.id !== user.id).map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
        </select>
        <select value={type} onChange={(e) => setType(e.target.value as any)} className="p-2 border rounded">
          <option value="deployment">deployment</option>
          <option value="access">access</option>
          <option value="technical_change">technical change</option>
        </select>
        <button disabled={loading} className="px-4 py-2 bg-sky-600 text-white rounded">{loading ? 'Guardando...' : 'Crear'}</button>
      </div>
    </form>
  );
}