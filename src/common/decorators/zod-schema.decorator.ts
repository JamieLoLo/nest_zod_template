import { SetMetadata } from '@nestjs/common';

export const ZOD_SCHEMA_KEY = 'zod_schema_key';

export function UseZodSchema(key: string): ClassDecorator & MethodDecorator {
  return SetMetadata(ZOD_SCHEMA_KEY, key);
}
