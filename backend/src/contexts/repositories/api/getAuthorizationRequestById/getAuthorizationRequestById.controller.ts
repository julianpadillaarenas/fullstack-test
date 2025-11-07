import { Body, Controller, Get, Headers, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { GetAuthorizationRequestByIdUseCase } from '../../../application/getAuthorizationRequestById/getAuthorizationRequestById.usecase';
import { UserGuard } from '../../../shared/guards/user.guard';

@UseGuards(UserGuard)
@Controller('authorization-request')
export class GetAuthorizationRequestByIdController {
  constructor(private readonly usecase: GetAuthorizationRequestByIdUseCase) {}

  @Get(":requestId")
  async run(
    @Body('userId', new ParseUUIDPipe())  userId: string,
    @Param('requestId', new ParseUUIDPipe({ version: '4' })) requestId: string,
  ) {
    const response = await this.usecase.execute(userId, requestId);
    return response;
  }
}
