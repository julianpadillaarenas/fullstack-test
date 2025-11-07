import { AuthorizationRequestStatus } from "../../domain/entities/authorizationRequest";

export interface UpdateStatusAuthorizationRequestDto {
  userId: string, 
  requestId: string, 
  status:AuthorizationRequestStatus, 
  commentary: string
}