import { NestFactory, Reflector } from '@nestjs/core';
import { GlobalZodValidationPipe } from './common/pipes/global-zod-validation.pipe';
import { MessagesModule } from './modules/messages/messages.module';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  const reflector = app.get(Reflector);
  app.useGlobalPipes(new GlobalZodValidationPipe(reflector));
  await app.listen(3000);
}
bootstrap();
