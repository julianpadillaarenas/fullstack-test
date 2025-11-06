import { AuthorizationRequest } from "../entities/authorizationRequest";
import { User } from "../entities/user";

export abstract class NotificationService {
  abstract notifyApprovalPending(responsible: User, request: AuthorizationRequest): Promise<void> | void;
  abstract notifyRequestCreated(requesting: User, request: AuthorizationRequest): Promise<void> | void;
}