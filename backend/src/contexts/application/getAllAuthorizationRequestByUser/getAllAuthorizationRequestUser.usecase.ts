import { AuthorizationRequestRepository } from "../../domain/repositories/authorizationRequest.repository";
import { Injectable } from "../../shared/dependency-injection/injectable";

@Injectable()
export class GetAllAuthorizationRequestUseCase {
  constructor(private readonly authRepo: AuthorizationRequestRepository){}

  async execute(userId:string){
    const req = await this.authRepo.findAllByIdUser(userId);

    if(!req) throw new Error('solicitud no encontrada')

    return req 
  }
}