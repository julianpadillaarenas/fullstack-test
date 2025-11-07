import { AuthorizationRequest } from "../../domain/entities/authorizationRequest";
import { User } from "../../domain/entities/user";
import { NotificationService } from "../../domain/services/notificationService";

export class NotificationMockService implements NotificationService {
  constructor(){}

  notifyApprovalPending(responsible: User, request: AuthorizationRequest): Promise<void> | void {
    console.log({responsible, request})
  }
  
  notifyRequestCreated(requesting: User, request: AuthorizationRequest): Promise<void> | void {
    console.log({requesting, request})
  }
}