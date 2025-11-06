import { UserRepository } from "../../domain/repositories/user.repository";
import { Injectable } from "../../shared/dependency-injection/injectable";

@Injectable()
export class GetAllUserUsecase {
  constructor(private readonly repo: UserRepository){}

  async execute(){
    const users = await this.repo.findAll()
    return { Users: users }
  }
}