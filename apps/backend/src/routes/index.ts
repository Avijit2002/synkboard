import { Router } from "express";
import boardRouter from "./boardRouter";
import { PrismaClient } from "@repo/database/db" 

const router = Router()

router.use('/board',boardRouter)

export default router