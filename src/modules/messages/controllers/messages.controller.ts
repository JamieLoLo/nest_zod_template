import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateMessageDtoClass } from '../schemas/create-message.schema';

@ApiTags('Messages') // 分類名稱
@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {
    return [{ id: 1, content: 'hello' }];
  }

  @Post()
  @ApiBody({ type: CreateMessageDtoClass }) // 顯示 Request Body Schema
  @ApiResponse({ status: 400, description: 'Zod validation failed' }) // ❌ 驗證失敗
  @ApiResponse({ status: 500, description: 'Internal server error' }) // ❌ 未預期錯誤
  createMessage(@Body() body: CreateMessageDtoClass) {
    return body;
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Fetched single message' })
  getMessage(@Param('id') id: string) {
    return { id };
  }
}
