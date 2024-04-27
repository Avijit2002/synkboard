import { ErrorRequestHandler } from "express"
import { createServer } from "./server"
import rootRouter from "./routes/index"
import { ApiError } from "./utils/apiError";
import { asyncFunction } from "./utils/asyncHandler";
import { errorHandler } from "./utils/defaultErrorHandler";
import 'dotenv/config'

import {
    ClerkExpressWithAuth,
    LooseAuthProp,
    WithAuthProp,
  } from '@clerk/clerk-sdk-node';


declare global {
    namespace Express {
      interface Request extends LooseAuthProp {}
    }
  }

const port = process.env.PORT || 3001;

const app = createServer()

app.get('/',ClerkExpressWithAuth(), asyncFunction(async (req, res, next) => {
       const userId = req.auth.userId
       if(!userId){
        throw new ApiError(402,"Not allowed!")
       }
    //res.send("hello from synkboard backend!")
}))

app.use('/api/v1', rootRouter)

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})