import { Body, Controller, Post } from "@nestjs/common";
import { CreateAuthorizationRequestHttpDto } from "./CreateAuthorizationRequest.httpDto";
import { CreateAuthorizationRequestUseCase } from "../../../application/createAuthorizatioRequest/createAuthorizationRequest.usecase";

@Controller('authorization-request')
export class CreateAuthorizationRequestController {
  constructor(private readonly usecase:CreateAuthorizationRequestUseCase){}

  @Post()
  async run(@Body() dto:CreateAuthorizationRequestHttpDto){
    const response = await this.usecase.execute(dto)
    return response
  }
}