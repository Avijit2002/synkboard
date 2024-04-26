import { Router } from "express";
import boardRouter from "./boardRouter";


const router = Router()

router.use('/board',boardRouter)

export default router