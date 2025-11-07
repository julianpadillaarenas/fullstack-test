import { Module } from '@nestjs/common';
import { GetAllUserController } from './contexts/repositories/api/getAllUser/getAllUser.controller';
import { CreateAuthorizationRequestController } from './contexts/repositories/api/createAuthorizationRequest/createAuthorizationRequest.controller';
import { GetPendingAuthorizationRequestController } from './contexts/repositories/api/getPendingAuthorizationRequest/getPendingAuthorizationRequest.controller';
import { GetAuthorizationRequestByIdController } from './contexts/repositories/api/getAuthorizationRequestById/getAuthorizationRequestById.controller';
import { GetAllAuthorizationRequestController } from './contexts/repositories/api/getAllAuthorizationRequest/getAllAuthorizationRequest.controller';
import { UpdateStatusAuthorizationRequestController } from './contexts/repositories/api/updateStatusAuthorizationRequest/updateStatusAuthorizationRequest.controller';
import { CreateAuthorizationRequestUseCase } from './contexts/application/createAuthorizatioRequest/createAuthorizationRequest.usecase';
import { GetPendingAuthorizationRequestByIdUseCase } from './contexts/application/getPendingAuthorizationRequest/getPendingAuthorizationRequestById.usecase';
import { GetAuthorizationRequestByIdUseCase } from './contexts/application/getAuthorizationRequestById/getAuthorizationRequestById.usecase';
import { GetAllAuthorizationRequestUseCase } from './contexts/application/getAllAuthorizationRequestByUser/getAllAuthorizationRequestUser.usecase';
import { updateStatusAuthorizationRequestUseCase } from './contexts/application/updateStatusAuthorizationRequest/updateStatusAuthorizationRequest.usecase';
import { GetAllUserUsecase } from './contexts/application/getAllUser/getAllUser.usecase';
import { NotificationMockService, PrismaAuthorizationRepository, PrismaUserRepository } from './contexts/repositories/infraestructure';
import { UserRepository } from './contexts/domain/repositories/user.repository';
import { AuthorizationRequestRepository } from './contexts/domain/repositories';
import { NotificationService } from './contexts/domain/services/notificationService';
import { PrismaService } from './contexts/shared/services/prisma-client';

@Module({
  imports: [],
  controllers: [
    GetAllUserController,
    CreateAuthorizationRequestController,
    GetPendingAuthorizationRequestController,
    GetAuthorizationRequestByIdController,
    GetAllAuthorizationRequestController,
    UpdateStatusAuthorizationRequestController
  ],
  providers: [
    PrismaService,
    CreateAuthorizationRequestUseCase,
    GetPendingAuthorizationRequestByIdUseCase,
    GetAuthorizationRequestByIdUseCase,
    GetAllAuthorizationRequestUseCase,
    updateStatusAuthorizationRequestUseCase,
    GetAllUserUsecase,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository
      // useClass: UserMockRepository
    },
    {
      provide: AuthorizationRequestRepository,
      useClass: PrismaAuthorizationRepository
      // useClass: AuthorizationMockRepository

    },
    {
      provide: NotificationService,
      useClass: NotificationMockService
    },
  ],
})
export class AppModule {}
