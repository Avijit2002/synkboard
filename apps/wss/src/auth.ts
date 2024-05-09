import "dotenv/config"
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "./db";
import { WebSocketWithAuth } from "./types";

const UnAuthenticatedMessage = {
    type: "conn/status",
    data: {
        error: "Authentication Failed!"
    }
}

export async function auth(data: any, ws: WebSocketWithAuth) {
    //console.log(data)
    const token = data.token
    const boardId = data.boardId
    let decoded: JwtPayload;
    const publicKey = process.env.CLERK_PEM_PUBLIC_KEY;
    if (token === undefined || boardId === undefined) {
        //ws.send(`HTTP/1.1 401 ${err}\r\n\r\n`);
        //ws.send(JSON.stringify(UnAuthenticatedMessage))
        return false
    }
    try {
        if (token && boardId) {
            decoded = jwt.verify(token, publicKey!) as JwtPayload;
            //console.log(decoded.org_id)

            const orgId = await prisma.boards.findUnique({
                where: {
                    id: boardId
                },
                select: {
                    orgId: true
                }
            })
            //console.log(orgId?.orgId, decoded.org_id)

            if (orgId?.orgId === decoded.org_id) {
                //console.log("hii")
                ws.boardId = boardId
                ws.userId = decoded.sub
                //ws.send(JSON.stringify(UnAuthenticatedMessage))
                return true
            }
        }
        return false
    } catch (error: any) {
        console.log(error.message)
        //ws.send("Server Error")
        return false
    }
}


// import "dotenv/config"
// import jwt from "jsonwebtoken";
// import { IncomingMessage } from "http"

// export const authenticate = (req: IncomingMessage, cb: (err: string | null, client: any) => void) => {
//     let decoded;
//     const publicKey = process.env.CLERK_PEM_PUBLIC_KEY;
//     const token = req.headers.authorization;

//     if (token === undefined) {
//         cb("Unauthorized", null)
//         return;
//     }

//     try {
//         if (token) {
//             decoded = jwt.verify(token, publicKey!);
//             cb(null, decoded);
//             return;
//         }
//     } catch (error) {
//         cb("JWT Error", null)
//         return;
//     }
// } 
