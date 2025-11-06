import { AuthorizationRequest } from "../../domain/entities/authorizationRequest";
import { User } from "../../domain/entities/user";
import { NotificationService } from "../../domain/services/notificationService";

export class NotificationMockService implements NotificationService {
  constructor(
    private readonly 
  ){}

  notifyApprovalPending(responsible: User, request: AuthorizationRequest): Promise<void> | void {
    
  }
  
  notifyRequestCreated(requesting: User, request: AuthorizationRequest): Promise<void> | void {
    
  }
}