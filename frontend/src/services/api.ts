import axios from "axios";
import type {
  PrimitiveAuthorizationRequest,
  PrimitiveUser,
} from "../types/models";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  timeout: 10000,
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response) {
      return Promise.reject({
        status: error.response.status,
        data: error.response.data,
      });
    }
    return Promise.reject({ status: 0, data: { message: error.message } });
  }
);

export async function listRequests(UserId: string) {

  const r = await api.get<PrimitiveAuthorizationRequest[]>(
    `/authorization-request`,{
      headers: {
        "User-Id": UserId,
      }
    }
  );
  return r.data;
}

export async function getRequestsById(UserId: string, id: string) {
  const r = await api.get<PrimitiveAuthorizationRequest>(
    `/authorization-request/${id}`, {
     headers: {
      "User-Id": UserId,
    }
  });
  return r.data;
}

export async function getRequestsPendingUser(UserId: string) {
  const r = await api.get(`/authorization-request/pending`, {
    headers: {
      "User-Id": UserId,
    },
  });
  return r.data as PrimitiveAuthorizationRequest[];
}

export async function createRequest(
  payload: Omit<
    PrimitiveAuthorizationRequest,
    "id" | "history" | "createdAt" | "updatedAt"
  >
) {
  const r = await api.post<PrimitiveAuthorizationRequest>(
    "/authorization-request",
    payload
  );
  return r.data;
}

export async function actionRequest(
  id: string,
  status: "approve" | "denied",
  userId: string,
  commentary: string
) {
  const r = await api.patch<PrimitiveAuthorizationRequest>(
    `/authorization-request/action/${id}`,
    { status, commentary },
    {
      headers: {
        "User-Id": userId,
      },
    }
  );
  return r.data;
}

export async function listUsers() {
  const r = await api.get("/user");
  return r.data.Users as PrimitiveUser[];
}

export default api;
