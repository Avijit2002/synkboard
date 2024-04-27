import { PrismaClient } from "@prisma/client";

// @ts-ignore
export const prisma = global.prisma || new PrismaClient();

// @ts-ignore
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export * from "@prisma/client";
