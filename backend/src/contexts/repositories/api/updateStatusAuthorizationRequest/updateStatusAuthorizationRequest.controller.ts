import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserGuard } from '../../../shared/guards/user.guard';
import { updateStatusAuthorizationRequestUseCase } from '../../../application/updateStatusAuthorizationRequest/updateStatusAuthorizationRequest.usecase';
import { UpdateStatusAuthorizationRequestHttpDto } from './UpdateStatusAuthorizationRequest.HttpDto';

@UseGuards(UserGuard)
@Controller('authorization-request')
export class UpdateStatusAuthorizationRequestController {
  constructor(
    private readonly usecase: updateStatusAuthorizationRequestUseCase,
  ) {}

  @Patch('/action/:requestId')
  async run(
    @Body() dto: UpdateStatusAuthorizationRequestHttpDto,
    @Param('requestId', new ParseUUIDPipe()) requestId: string
  ) {
    const response = await this.usecase.execute({...dto, requestId, });
    return response;
  }
}
