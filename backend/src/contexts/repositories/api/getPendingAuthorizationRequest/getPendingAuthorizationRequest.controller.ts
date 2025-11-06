import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { GetPendingAuthorizationRequestByIdUseCase} from '../../../application/getPendingAuthorizationRequest/getPendingAuthorizationRequestById.usecase';

@Controller('authorization-request')
export class GetPendingAuthorizationRequestController {
  constructor(private readonly usecase: GetPendingAuthorizationRequestByIdUseCase) {}

  @Get()
  async run(
    @Param('userId', new ParseUUIDPipe({ version: '4' })) userId: string,
  ) {
    const response = await this.usecase.execute(userId);
    return response;
  }
}
