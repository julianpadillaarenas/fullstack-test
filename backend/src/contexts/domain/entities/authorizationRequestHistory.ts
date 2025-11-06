import { v4 as uuidv4 } from "uuid";
import { AuthorizationRequestStatus } from "./authorizationRequest"

export interface PrimitiveAuthorizationRequestHistory {
  id?: string
  authorizationRequestId: string,
  status: AuthorizationRequestStatus
  date?: Date
  actionUserId: string
  commentary: string
}

export class AuthorizationRequestHistory {
  public readonly id?: string
  public readonly authorizationRequestId: string
  public readonly status: AuthorizationRequestStatus
  public readonly date?: Date
  public readonly actionUserId: string
  public readonly commentary: string

  constructor({
    id,
    authorizationRequestId,
    actionUserId,
    status,
    commentary,
    date
  }: PrimitiveAuthorizationRequestHistory){
    this.id = id ?? uuidv4()
    this.status = status
    this.authorizationRequestId = authorizationRequestId
    this.actionUserId = actionUserId
    this.commentary = commentary
    this.date = date ?? new Date()

    this.ensureIsValid()
  }

   private ensureIsValid() {
    if (!this.id || this.id.length < 2) {
      throw new Error('El id del usuario debe tener al menos 2 caracteres.');
    }

    if (!this.authorizationRequestId || !this.isValidUUID(this.authorizationRequestId)) {
      throw new Error('El id de la solicitud de autorizacion debe ser un uuid');
    }

    if (!this.actionUserId || !this.isValidUUID(this.actionUserId)) {
      throw new Error('El id del usuario debe ser un uuid');
    }

    if (!this.commentary || this.commentary.length < 10) {
      throw new Error('El comentario debe tener al menos 10 caracteres.');
    }

    if (!this.date || !(this.date instanceof Date)) {
      throw new Error('debe ser una fecha valida');
    }

    if (!Object.values(AuthorizationRequestStatus).includes(this.status)) {
      throw new Error("Estado de historial solicitud inválido.");
    }

  }

  public static createFromPrimitive(data: PrimitiveAuthorizationRequestHistory){
    return new AuthorizationRequestHistory({
      ...data
    })
  }

  private isValidUUID(id: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  }

  
}