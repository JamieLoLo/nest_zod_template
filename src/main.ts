import { NestFactory, Reflector } from '@nestjs/core';
import { GlobalZodValidationPipe } from './common/pipes/global-zod-validation.pipe';
import { MessagesModule } from './modules/messages/messages.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  const reflector = app.get(Reflector);
  app.useGlobalPipes(new GlobalZodValidationPipe(reflector));

  // ✅ 建立 Swagger 文件設定
  const config = new DocumentBuilder()
    .setTitle('Nest Zod Template')
    .setDescription('使用 Zod 驗證的 NestJS API 文件')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 開啟 http://localhost:3000/api 即可查看

  await app.listen(3000);
}
bootstrap();
