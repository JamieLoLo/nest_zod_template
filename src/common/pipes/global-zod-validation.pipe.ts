import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ZodSchema } from 'zod';
import { ZOD_SCHEMA_KEY } from '../../common/decorators/zod-schema.decorator';
import { schemaRegistry } from '../../common/zod/schemaRegistry';

@Injectable()
export class GlobalZodValidationPipe implements PipeTransform {
  constructor(private readonly reflector: Reflector) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    // 只驗證 body，其餘直接 pass
    if (metadata.type !== 'body') return value;

    // 若 metatype 為 undefined，用 Object 當後備值是為了避免 Reflector 報錯
    // Reflector.get() 要求第二個參數必須是 Function 類型（不能是 undefined）
    const target = metadata.metatype ?? Object;
    const schemaKey = this.reflector.get<string>(ZOD_SCHEMA_KEY, target);
    console.log('🔍 Zod schema key from metadata:', schemaKey);

    // 沒貼 @ZodSchema 就不驗
    if (!schemaKey) return value;

    // 取出對應 schema；型別 cast 讓 ESLint 安心
    // 代表：schemaRegistry 是一個物件，它的 key 一定是字串，對應的 value 是符合 ZodSchema 規範的驗證物件。
    const schema = (schemaRegistry as Record<string, ZodSchema>)[schemaKey];

    if (!schema) {
      throw new Error(`No Zod schema found for key: ${String(schemaKey)}`);
    }

    const result = schema.safeParse(value);
    if (!result.success) {
      throw new BadRequestException(result.error.format());
    }

    // Zod 的 safeParse() 成功時會回傳 result.data（型別為 any）
    // 為了避免 unsafe-return 警告，這裡先轉成 unknown，讓 controller 再自行斷言型別
    return result.data as unknown;
  }
}
