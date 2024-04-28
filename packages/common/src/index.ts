import { z } from "zod"

export const createBoardSchema = z.object({
    title: z.string().trim().min(1, 'Title is required and cannot be empty'),
    orgId: z.string().trim().min(1, 'OrgId is required and cannot be empty'),
})

export type typeCreateBoardSchema = z.infer<typeof createBoardSchema>