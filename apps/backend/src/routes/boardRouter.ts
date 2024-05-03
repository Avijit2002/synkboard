import { Router } from "express";
import { asyncFunction } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import { PrismaClient } from "@repo/database/db";
import { createBoardSchema } from "@repo/common"
import { responseStatus } from "../utils/statusCode";

const router = Router()
const prisma = new PrismaClient()

const images = [
    "/placeholder/1.svg",
    "/placeholder/2.svg",
    "/placeholder/3.svg",
    "/placeholder/4.svg",
    "/placeholder/5.svg",
]

router.use(ClerkExpressWithAuth())

router.post('/create', asyncFunction(async (req, res) => {
    if (!req.auth.userId) {
        throw new ApiError(responseStatus.unauthorized, "Unauthorized!")
    }

    //console.log(req)

    const validated = createBoardSchema.safeParse(req.body)
    if (!validated.success) {
        console.error(validated.error.errors)
        throw new ApiError(responseStatus.incorrectInput, "Invalid Inputs")
        // TODO : also send error object with error descriptions, parse zod error
    }
    const randomImage = images[Math.floor(Math.random() * images.length)] as string
    const data = { ...validated.data, imageUrl: randomImage, authorId: req.auth.userId }


    const board = await prisma.boards.create({
        data: data
    })

    if (!board.id) {
        throw new ApiError(responseStatus.serviceUnavailable, "DB Down, Try again later!")
    }

    res.status(responseStatus.success).json({
        success: true,
        message: "Board created successfully!",
        data: {
            boardId: board.id
        }
    })

}))

router.get('/boardList', asyncFunction(async (req, res) => {

    if (!req.auth.userId) {
        throw new ApiError(responseStatus.unauthorized, "Unauthorized!")
    }

    const orgId = req.query.orgId;
    const filter = req.query.filter;
    console.log(filter)
    if (req.auth.orgId !== orgId) throw new ApiError(responseStatus.unauthorized, "Unauthorized!")


    let boards;

     boards = filter === "undefined"? await prisma.boards.findMany({
        where: {
            orgId: orgId,
        },
    }): await prisma.boards.findMany({
        where: {
            orgId: orgId,
            title: {
                startsWith: filter as string
            }
        },
    })




    if (!boards) {
        throw new ApiError(responseStatus.serviceUnavailable, "DB Down, Try again later!")
    }

    res.status(responseStatus.success).json({
        success: true,
        data: boards,
    })

}))

export default router