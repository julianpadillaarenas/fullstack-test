import { Controller, Get } from "@nestjs/common";
import { GetAllUserUsecase } from "../../../application/getAllUser/getAllUser.usecase";

@Controller('user')
export class GetAllUserController {
  constructor(private readonly usecase: GetAllUserUsecase){}

  @Get()
  async run(){
    const users = await this.usecase.execute();
    return users
  }
}