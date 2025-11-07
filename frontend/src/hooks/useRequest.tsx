import { useState, useCallback } from 'react';
import * as api from '../services/api';
import type { PrimitiveAuthorizationRequest } from '../types/models';

export function useRequests() {
  const [requests, setRequests] = useState<PrimitiveAuthorizationRequest[]>([]);
  const [pendingRequests, setPendingRequests] = useState<PrimitiveAuthorizationRequest[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async (userId:string) => {
    setLoading(true); setError(null);
    try {
      const data = await api.listRequests(userId);
      setRequests(data)
    } catch (e) {
      console.log({e})
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllPending = useCallback(async (userId:string)=> {
    setLoading(true); setError(null);
    try {
      const data = await api.getRequestsPendingUser(userId)
      setPendingRequests(data)
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  },[])

  return { requests, loading, error, refetch: fetchAll, fetchAllPending, pendingRequests };
}