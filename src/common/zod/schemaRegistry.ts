import { z } from 'zod';
import { CreateMessageSchema } from '../../modules/messages/schemas/create-message.schema';

export const schemaRegistry = {
  createMessage: CreateMessageSchema,
} satisfies Record<string, z.ZodSchema>;
