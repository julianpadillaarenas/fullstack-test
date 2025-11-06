import { AuthorizationRequestRepository } from "../../domain/repositories/authorizationRequest.repository";
import { Injectable } from "../../shared/dependency-injection/injectable";

@Injectable()
export class GetPendingAuthorizationRequestByIdUseCase {
  constructor(private readonly authRepo: AuthorizationRequestRepository){}

  async execute(userId:string){
    const req = await this.authRepo.findAllPendingByIdUser(userId);

    if(!req) throw new Error('solicitud no encontrada')

    return req 
  }
}