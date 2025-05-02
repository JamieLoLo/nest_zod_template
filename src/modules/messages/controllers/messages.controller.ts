import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import {
  CreateMessageDto,
  CreateMessageDtoClass,
} from '../schemas/create-message.schema';

@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {
    return [{ id: 1, content: 'hello' }];
  }

  @Post()
  createMessage(@Body() body: CreateMessageDtoClass) {
    return body as CreateMessageDto;
  }

  @Get(':id')
  getMessage(@Param('id') id: string) {
    return { id };
  }
}
