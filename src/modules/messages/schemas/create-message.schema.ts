// modules/messages/schemas/create-message.schema.ts
import { z } from 'zod';
import { UseZodSchema } from '../../../common/decorators/zod-schema.decorator';

export const CreateMessageSchema = z.object({
  content: z.string(),
});

export type CreateMessageDto = z.infer<typeof CreateMessageSchema>;

// 將裝飾器貼在 class 上，讓 pipe 可以透過 metadata.metatype 取得驗證 key
// 如果 controller 中使用的是 type（CreateMessageDto），由於 type 在編譯後會被移除，pipe 就無法取得 metadata
// 此寫法的好處是：將 zod schema 與 class 型別分離，使 schema 可在其他場景重用（如前端驗證、表單等）
@UseZodSchema('createMessage')
export class CreateMessageDtoClass {} // 給 pipe 用來取 metadata 的類別，不直接用來驗證

// 總結
// ✅ CreateMessageSchema 是驗證規則本體（用來做型別驗證）
// ✅ CreateMessageDtoClass 是 metadata 載體（讓 Nest pipe 能觸發驗證）
