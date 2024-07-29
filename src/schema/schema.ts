import { z } from 'zod';

const userSchema = z.object({
  image: z.object({
    png: z.string(),
    webp: z.string()
  }),
  username: z.string()
});

export const replySchema = z.object({
  content: z.string(),
  createdAt: z.string(),
  id: z.number(),
  replyingTo: z.string(),
  score: z.number(),
  user: userSchema
});

export const commentSchema = z.object({
  content: z.string(),
  createdAt: z.string(),
  id: z.number(),
  replies: z.array(replySchema),
  score: z.number(),
  user: userSchema
});

export const commentsSchema = z.array(commentSchema);

export const currentUserSchema = z.object({
  image: z.object({
    png: z.string(),
    webp: z.string()
  }),
  username: z.string()
});

// Ejemplo de uso
export const dataSchema = z.object({
  comments: commentsSchema,
  currentUser: currentUserSchema
});