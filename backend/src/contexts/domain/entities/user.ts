import { v4 as uuidv4 } from "uuid";

export interface PrimitiveUser {
  id?: string,
  name: string,
  email: string,
}

export class User {
  public readonly id?: string
  public readonly name: string
  public readonly email: string

  constructor({ email, name, id }:PrimitiveUser){
    this.id = id ?? uuidv4()
    this.email = email
    this.name = name

    this.ensureIsValid()
  }

  private ensureIsValid() {
    if (!this.id || !this.isValidUUID(this.id)) {
      throw new Error('El id del usuario debe ser un uuid');
    }

    if (!this.name || this.name.length < 2) {
      throw new Error('El nombre del usuario debe tener al menos 2 caracteres.');
    }

    if (!this.email || !this.isValidEmail(this.email)) {
      throw new Error('El correo electrónico del usuario no es válido.');
    }
  }

  private isValidUUID(id: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  }


  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  static createFromPrimitives(data: PrimitiveUser){
    return new User({
      ...data
    })
  }


  toPrimitives(): PrimitiveUser {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }

}