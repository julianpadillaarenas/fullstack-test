import { v4 as uuidv4 } from "uuid";
import { AuthorizationRequestHistory } from "./authorizationRequestHistory";

export enum AuthorizationRequestTypeOfRequest {
  DEPLOYMENT = "deployment",
  ACCESS = "access",
  TECHNICAL_CHANGE = "technical change",
}

export enum AuthorizationRequestStatus {
  APPROVE = 'approve',
  DENIED = 'denied',
  PENDING = 'pending'
}

export interface PrimitiveAuthorizationRequest {
  id?: string,
  title: string
  description: string
  requestingUserId: string
  responsibleUserId: string
  typeOfRequest: AuthorizationRequestTypeOfRequest
  status: AuthorizationRequestStatus
  history?: AuthorizationRequestHistory[]
}

export class AuthorizationRequest {
  public readonly id?: string
  public title: string
  public description: string
  public requestingUserId: string
  public responsibleUserId: string
  public typeOfRequest: AuthorizationRequestTypeOfRequest
  public history?: AuthorizationRequestHistory[] = []
  public status: AuthorizationRequestStatus

  constructor({ 
    id,
    description,
    typeOfRequest,
    requestingUserId,
    responsibleUserId,
    title,
    status
  }:PrimitiveAuthorizationRequest){
    this.id = id ?? uuidv4()
    this.title = title
    this.status = status
    this.description = description
    this.requestingUserId = requestingUserId
    this.responsibleUserId = responsibleUserId
    this.typeOfRequest = typeOfRequest
    
    this.ensureIsValid()
  }


  private ensureIsValid() {
    if (!this.id || !this.isValidUUID(this.id)) {
      throw new Error('El id del usuario debe ser un uuid');
    }

     if (!this.title || this.title.length < 5) {
      throw new Error('El Titulo debe tener al menos 5 caracteres.');
    }

    if (!this.description || this.description.length < 10) {
      throw new Error('La descripcion debe tener al menos 10 caracteres.');
    }

    if (!this.requestingUserId || !this.isValidUUID(this.requestingUserId)) {
      throw new Error('El id del solicitante debe ser un uuid');
    }

    if (!this.responsibleUserId || !this.isValidUUID(this.responsibleUserId)) {
      throw new Error('El id del responsable debe ser un uuid');
    }

    if (!Object.values(AuthorizationRequestStatus).includes(this.status)) {
      throw new Error("Estado de solicitud inválido.");
    }
    
    if (!Object.values(AuthorizationRequestTypeOfRequest).includes(this.typeOfRequest)) {
      throw new Error("Tipo de Solicitud inválido.");
    }
  }

  static createFromPrimitives(data: PrimitiveAuthorizationRequest) {
    const authorizationRequestId = data.id ?? uuidv4()
    
    const authorizationRequest = new AuthorizationRequest({
      ...data,
      id: authorizationRequestId,
    })

    const history = AuthorizationRequestHistory.createFromPrimitive({
      actionUserId: data.requestingUserId,
      authorizationRequestId,
      commentary: `creacion de solicitud`,
      status: data.status
    })

    authorizationRequest.history?.push(history)
    return authorizationRequest
  }


  approved(actionUserId: string, commentary: string){
    if (!this.isValidUUID(actionUserId)) throw new Error("actionUserId debe ser uuid válido");
    if(this.responsibleUserId === actionUserId) throw new Error("El Usuario no es el responsable de esta solicitud");
    if(this.status === AuthorizationRequestStatus.APPROVE) throw new Error("La Solicitud ya fue aprovada");

    this.status = AuthorizationRequestStatus.APPROVE
    const h = AuthorizationRequestHistory.createFromPrimitive({
      ...this,
      commentary,
      actionUserId,
      authorizationRequestId: ""
    })

    this.history?.push(h)
  }

  denied(actionUserId: string, commentary: string){
    if (!this.isValidUUID(actionUserId)) throw new Error("actionUserId debe ser uuid válido");
    if(this.responsibleUserId === actionUserId) throw new Error("El Usuario no es el responsable de esta solicitud");
    if(this.status === AuthorizationRequestStatus.DENIED) throw new Error("La Solicitud ya fue denegada");

    this.status = AuthorizationRequestStatus.DENIED
    const h = AuthorizationRequestHistory.createFromPrimitive({
      ...this,
      commentary,
      actionUserId,
      authorizationRequestId: ""
    })

    this.history?.push(h)
  }

  


  private isValidUUID(id: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  }
}