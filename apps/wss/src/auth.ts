import "dotenv/config"
import jwt from "jsonwebtoken";
import { IncomingMessage } from "http"

export const authenticate = (req: IncomingMessage, cb: (err: string | null, client: any) => void) => {
    let decoded;
    const publicKey = process.env.CLERK_PEM_PUBLIC_KEY;
    const token = req.headers.authorization;

    if (token === undefined) {
        cb("Unauthorized", null)
        return;
    }

    try {
        if (token) {
            decoded = jwt.verify(token, publicKey!);
            cb(null, decoded);
            return;
        }
    } catch (error) {
        cb("JWT Error", null)
        return;
    }
} 