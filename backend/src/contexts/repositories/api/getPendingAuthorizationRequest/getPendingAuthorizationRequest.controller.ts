import {
  Body,
  Controller,
  Get,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { GetPendingAuthorizationRequestByIdUseCase } from '../../../application/getPendingAuthorizationRequest/getPendingAuthorizationRequestById.usecase';
import { UserGuard } from '../../../shared/guards/user.guard';

@UseGuards(UserGuard)
@Controller('authorization-request')
export class GetPendingAuthorizationRequestController {
  constructor(
    private readonly usecase: GetPendingAuthorizationRequestByIdUseCase,
  ) {}

  @Get('/pending')
  async run(@Body('userId', new ParseUUIDPipe()) userId: string) {
    const response = await this.usecase.execute(userId);
    return response;
  }
}
