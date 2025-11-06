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
    return this.auth.filter(a=> a.status === AuthorizationRequestStatus.PENDING && a.requestingUserId === userId)
  }

  async findById(id: string): Promise<AuthorizationRequest | null> {
    return this.auth.filter(a=> a.status === AuthorizationRequestStatus.PENDING && a.id === id)[0]
  }

} 