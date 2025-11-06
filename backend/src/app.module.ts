import { Module } from '@nestjs/common';
import { GetAllUserController } from './contexts/repositories/api/getAllUser/getAllUser.controller';
import { CreateAuthorizationRequestController } from './contexts/repositories/api/createAuthorizationRequest/createAuthorizationRequest.controller';
import { GetPendingAuthorizationRequestController } from './contexts/repositories/api/getPendingAuthorizationRequest/getPendingAuthorizationRequest.controller';
import { GetAuthorizationRequestByIdController } from './contexts/repositories/api/getAuthorizationRequestById/getAuthorizationRequestById.controller';
import { GetAllAuthorizationRequestController } from './contexts/repositories/api/getAllAuthorizationRequest/getAllAuthorizationRequest.controller';
import { CreateAuthorizationRequestUseCase } from './contexts/application/createAuthorizatioRequest/createAuthorizationRequest.usecase';
import { GetPendingAuthorizationRequestByIdUseCase } from './contexts/application/getPendingAuthorizationRequest/getPendingAuthorizationRequestById.usecase';
import { GetAuthorizationRequestByIdUseCase } from './contexts/application/getAuthorizationRequestById/getAuthorizationRequestById.usecase';
import { GetAllAuthorizationRequestUseCase } from './contexts/application/getAllAuthorizationRequestByUser/getAllAuthorizationRequestUser.usecase';
import { GetAllUserUsecase } from './contexts/application/getAllUser/getAllUser.usecase';
import { UserMockRepository } from './contexts/repositories/infraestructure/userMockRepository';
import { UserRepository } from './contexts/domain/repositories/user.repository';
import { AuthorizationMockRepository } from './contexts/repositories/infraestructure/authorizationMockRepository';
import { AuthorizationRequestRepository } from './contexts/domain/repositories/authorizationRequest.repository';
import { NotificationService } from './contexts/domain/services/notificationService';
import { NotificationMockService } from './contexts/repositories/infraestructure/notificationMockService';

@Module({
  imports: [],
  controllers: [
    GetAllUserController,
    CreateAuthorizationRequestController,
    GetPendingAuthorizationRequestController,
    GetAuthorizationRequestByIdController,
    GetAllAuthorizationRequestController,
  ],
  providers: [
    CreateAuthorizationRequestUseCase,
    GetPendingAuthorizationRequestByIdUseCase,
    GetAuthorizationRequestByIdUseCase,
    GetAllAuthorizationRequestUseCase,
    GetAllUserUsecase,
    {
      provide: UserRepository,
      useClass: UserMockRepository
    },
    {
      provide: AuthorizationRequestRepository,
      useClass: AuthorizationMockRepository
    },
    {
      provide: NotificationService,
      useClass: NotificationMockService
    },
  ],
})
export class AppModule {}
