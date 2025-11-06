import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { GetAllAuthorizationRequestUseCase } from '../../../application/getAllAuthorizationRequestByUser/getAllAuthorizationRequestUser.usecase';

@Controller('authorization-request')
export class GetAllAuthorizationRequestController {
  constructor(private readonly usecase: GetAllAuthorizationRequestUseCase) {}

  @Get(":userId")
  async run(
    @Param('userId', new ParseUUIDPipe({ version: '4' })) userId: string,
  ) {
    const response = await this.usecase.execute(userId);
    return response;
  }
}
