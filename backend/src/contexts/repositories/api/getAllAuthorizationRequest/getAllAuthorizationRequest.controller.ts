import { Body, Controller, Get, Headers, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { GetAllAuthorizationRequestUseCase } from '../../../application/getAllAuthorizationRequestByUser/getAllAuthorizationRequestUser.usecase';
import { UserGuard } from '../../../shared/guards/user.guard';

@UseGuards(UserGuard)
@Controller('authorization-request')
export class GetAllAuthorizationRequestController {
  constructor(private readonly usecase: GetAllAuthorizationRequestUseCase) {}
  
  @Get()
  async run(
    @Body('userId', new ParseUUIDPipe()) userId: string,
  ) {
    const response = await this.usecase.execute(userId);
    return response;
  }
}
