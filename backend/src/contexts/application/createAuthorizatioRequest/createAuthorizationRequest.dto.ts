import { AuthorizationRequestTypeOfRequest } from "../../domain/entities/authorizationRequest"

export interface CreateAuthorizationRequestDto {
  title: string
  description: string
  requestingUserId: string
  responsibleUserId: string
  typeOfRequest: AuthorizationRequestTypeOfRequest
}