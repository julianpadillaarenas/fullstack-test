import { IsEnum, IsNotEmpty, IsString, IsUUID, Length } from "class-validator"
import { AuthorizationRequestTypeOfRequest } from "../../../domain/entities/authorizationRequest"

export class CreateAuthorizationRequestHttpDto {
  @IsNotEmpty()
  @IsString()
  @Length(5)
  title: string

  @IsNotEmpty()
  @IsString()
  @Length(10)
  description: string

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  requestingUserId: string

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  responsibleUserId: string

  @IsNotEmpty()
  @IsString()
  @IsEnum(AuthorizationRequestTypeOfRequest)
  typeOfRequest: AuthorizationRequestTypeOfRequest
}