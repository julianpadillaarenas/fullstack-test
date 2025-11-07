export enum AuthorizationRequestTypeOfRequest {
  DEPLOYMENT = "deployment",
  ACCESS = "access",
  TECHNICAL_CHANGE = "technical change",
}

export enum AuthorizationRequestStatus {
  APPROVE = "approve",
  DENIED = "denied",
  PENDING = "pending",
}

export interface AuthorizationRequestHistory {
  id: string;
  authorizationRequestId: string;
  status: AuthorizationRequestStatus;
  date: string; // ISO string en frontend
  actionUserId: string;
  commentary: string;
}

export interface PrimitiveAuthorizationRequest {
  id: string;
  title: string;
  description: string;
  requestingUserId: string;
  responsibleUserId: string;
  typeOfRequest: AuthorizationRequestTypeOfRequest;
  status: AuthorizationRequestStatus;
  history?: AuthorizationRequestHistory[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PrimitiveUser {
  id: string,
  name: string,
  email: string,
}