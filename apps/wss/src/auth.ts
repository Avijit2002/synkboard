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


// we are getting boardId and jwt token from client, we will extract orgId from token and extract orgId to which this boardId belongs from db, if both orgId matches then use is allowed and authenticated
// Basically we are checking if orgId of board and user is same or not
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
            //console.log(decoded)

            const board = await prisma.boards.findUnique({
                where: {
                    id: boardId
                },
                select:{
                    orgId: true,
                    title: true
                }
            })
            //console.log(orgId?.orgId, decoded.org_id)

            if (board?.orgId === decoded.org_id) {
                //console.log("hii")
                ws.board = {
                    boardId,
                    title: board?.title
                }
                ws.user = {
                    userId : decoded.sub,
                    userName : data.username
                }
        
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
