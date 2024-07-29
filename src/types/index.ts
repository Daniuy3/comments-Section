import { commentSchema, commentsSchema, currentUserSchema, dataSchema, replySchema } from "../schema/schema";
import { z } from "zod";

/* Comentarios y usuario actual */
export type DataCommentsResult = z.infer<typeof dataSchema>;

/* Comentario individual */
export type SelfComment = z.infer<typeof commentSchema>;

/* Comentarios */
export type arrayComment = z.infer<typeof commentsSchema>;

/* Replies */
export type reply = z.infer<typeof replySchema>;

/* Usuario */
export type user = z.infer<typeof currentUserSchema>;