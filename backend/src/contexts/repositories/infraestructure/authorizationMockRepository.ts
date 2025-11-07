import { Injectable } from '@nestjs/common';
import { AuthorizationRequest, AuthorizationRequestStatus, PrimitiveAuthorizationRequest } from '../../domain/entities/authorizationRequest';
import { AuthorizationRequestRepository } from '../../domain/repositories/authorizationRequest.repository'

@Injectable()
export class AuthorizationMockRepository implements AuthorizationRequestRepository {
  private auth:AuthorizationRequest[] = []

  constructor(){}

  async create(data: PrimitiveAuthorizationRequest): Promise<AuthorizationRequest> {
    const a = AuthorizationRequest.createFromPrimitives({...data})
    this.auth.push(a)
    return a
  }

  async delete(id: string): Promise<void> {
    const authFiltered = this.auth.filter(a=>a.id !== id)
    this.auth = authFiltered
  }

  async findAll(): Promise<AuthorizationRequest[]> {
    return this.auth
  }

  async findAllByIdUser(userId: string): Promise<AuthorizationRequest[] | null> {
    return this.auth.filter(a=> a.requestingUserId === userId)
  }

  async findAllPendingByIdUser(userId: string): Promise<AuthorizationRequest[] | null> {
    return this.auth.filter(a=> a.status === AuthorizationRequestStatus.PENDING && a.responsibleUserId === userId)
  }

  async findById(id: string): Promise<AuthorizationRequest | null> {
    return this.auth.filter(a=> a.status === AuthorizationRequestStatus.PENDING && a.id === id)[0]
  }

  async update(
    requestId: string,
    data: Partial<Omit<PrimitiveAuthorizationRequest, 'id'>>
  ): Promise<AuthorizationRequest> {
    const index = this.auth.findIndex(a => a.id === requestId);
    if (index < 0) throw new Error('solicitud no encontrada');

    const current = this.auth[index];

    const filtered = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    ) as Partial<Omit<PrimitiveAuthorizationRequest, 'id'>>;

    const mergedPrimitives: PrimitiveAuthorizationRequest = {
      id: current.id,
      title: filtered.title ?? current.title,
      description: filtered.description ?? current.description,
      requestingUserId: filtered.requestingUserId ?? current.requestingUserId,
      responsibleUserId: filtered.responsibleUserId ?? current.responsibleUserId,
      typeOfRequest: (filtered.typeOfRequest ?? current.typeOfRequest) as any,
      status: (filtered.status ?? current.status) as any,
    };

    const updatedEntity = new AuthorizationRequest({...mergedPrimitives});
    updatedEntity.history = filtered.history ?? current.history,

    this.auth = [
      ...this.auth.slice(0, index),
      updatedEntity,
      ...this.auth.slice(index + 1),
    ];

    return updatedEntity;
  }

} 