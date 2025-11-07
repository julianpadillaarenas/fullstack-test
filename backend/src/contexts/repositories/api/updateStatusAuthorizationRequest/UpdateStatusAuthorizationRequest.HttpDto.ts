import { IsEnum, IsString, IsUUID, Length } from "class-validator";
import { AuthorizationRequestStatus } from "../../../domain/entities/authorizationRequest";

export class UpdateStatusAuthorizationRequestHttpDto {
  @IsString()
  @IsEnum(AuthorizationRequestStatus)
  status: AuthorizationRequestStatus
  
  @IsString()
  @IsUUID()
  userId: string

  @IsString()
  @Length(10)
  commentary: string

}