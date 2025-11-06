import { Injectable } from "@nestjs/common";
import { AuthorizationRequestRepository } from "../../domain/repositories/authorizationRequest.repository";

@Injectable()
export class GetAuthorizationRequestByIdUseCase {
  constructor(private readonly authRepo: AuthorizationRequestRepository){}

  async execute(userId:string, requestId: string){
    const req = await this.authRepo.findById(requestId);

    if(!req) throw new Error('solicitud no encontrada')

    return req 
  }
}