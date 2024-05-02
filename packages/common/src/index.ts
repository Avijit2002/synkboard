import { z } from "zod"

export const createBoardSchema = z.object({
    userName: z.string().trim().min(1, 'Username is required and cannot be empty'),
    title: z.string().trim().min(1, 'Title is required and cannot be empty'),
    orgId: z.string().trim().min(1, 'OrgId is required and cannot be empty'),
})

export type typeCreateBoardSchema = z.infer<typeof createBoardSchema>

export type typeBoard = {
    authorId: string,
    userName: string,
    createdAt: Date;
    id: string;
    imageUrl: string;
    orgId: string;
    title: string;
    updatedAt: Date;
  };