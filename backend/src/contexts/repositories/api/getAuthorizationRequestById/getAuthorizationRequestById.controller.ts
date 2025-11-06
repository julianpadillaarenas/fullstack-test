import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { GetAuthorizationRequestByIdUseCase } from '../../../application/getAuthorizationRequestById/getAuthorizationRequestById.usecase';

@Controller('authorization-request')
export class GetAuthorizationRequestByIdController {
  constructor(private readonly usecase: GetAuthorizationRequestByIdUseCase) {}

  @Get(":id/:requestId")
  async run(
    @Param('id', new ParseUUIDPipe({ version: '4' })) userId: string,
    @Param('requestId', new ParseUUIDPipe({ version: '4' })) requestId: string,
  ) {
    const response = await this.usecase.execute(userId, requestId);
    return response;
  }
}
