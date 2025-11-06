import { AuthorizationRequest, AuthorizationRequestStatus } from "../../domain/entities/authorizationRequest";
import { AuthorizationRequestRepository } from "../../domain/repositories/authorizationRequest.repository";
import { UserRepository } from "../../domain/repositories/user.repository";
import { NotificationService } from "../../domain/services/notificationService";
import { Injectable } from "../../shared/dependency-injection/injectable";
import { CreateAuthorizationRequestDto } from "./createAuthorizationRequest.dto";

@Injectable()
export class CreateAuthorizationRequestUseCase {
  constructor(
    private readonly authRepo: AuthorizationRequestRepository,
    private readonly userRepo: UserRepository,
    private readonly notification: NotificationService
  ) {}

  async execute(data: CreateAuthorizationRequestDto) {
    const requestUser = await this.userRepo.findById(data.requestingUserId)
    const responsibleUser = await this.userRepo.findById(data.responsibleUserId)
    if(!requestUser) throw new Error('usuario no encontrado')
    if(!responsibleUser) throw new Error('usuario no encontrado')
    
    const authorizationRequest = AuthorizationRequest.createFromPrimitives({
      ...data,
      status: AuthorizationRequestStatus.PENDING,
    });

    await this.notification.notifyApprovalPending(requestUser, authorizationRequest)
    await this.authRepo.create(authorizationRequest);
    return authorizationRequest
  }
}
