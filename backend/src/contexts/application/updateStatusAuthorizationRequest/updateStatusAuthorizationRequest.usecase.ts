import { Injectable } from '@nestjs/common';
import { AuthorizationRequestStatus } from '../../domain/entities/authorizationRequest';
import { AuthorizationRequestRepository } from '../../domain/repositories/authorizationRequest.repository';
import { UpdateStatusAuthorizationRequestDto } from './updateStatusAuthorizationRequest.dto';

@Injectable()
export class updateStatusAuthorizationRequestUseCase {
  constructor(private readonly repo: AuthorizationRequestRepository) {}

  async execute({
    commentary,
    requestId,
    status,
    userId,
  }: UpdateStatusAuthorizationRequestDto) {
    const findRequest = await this.repo.findById(requestId);

    if (!findRequest) throw new Error('solicitud no encontrada');
    
    if (findRequest.responsibleUserId !== userId) throw new Error('no eres el propietario de esta solicitud');
    
    if (status === AuthorizationRequestStatus.APPROVE) {
      findRequest.approved(userId, commentary);
    } else {
      findRequest.denied(userId, commentary)
    }

    const res = await this.repo.update(requestId, findRequest);

    return res;
  }
}
