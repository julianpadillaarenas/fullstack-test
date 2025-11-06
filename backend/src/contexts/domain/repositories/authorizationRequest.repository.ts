import { GenericRepository } from "../../shared/interfaces/genericRepository";
import { AuthorizationRequest, PrimitiveAuthorizationRequest } from "../entities/authorizationRequest";

export abstract class AuthorizationRequestRepository extends GenericRepository<AuthorizationRequest, PrimitiveAuthorizationRequest> {
  abstract findAllByIdUser(userId: string): Promise<AuthorizationRequest[] | null>
  abstract findAllPendingByIdUser(userId: string): Promise<AuthorizationRequest[] | null>
}