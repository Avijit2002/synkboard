import { Router } from "express";
import { asyncFunction } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";

const router = Router()

router.get('/create',asyncFunction(async (req,res,next)=>{
    //throw new ApiError(402, "bye")
}))

export default router