import express, { ErrorRequestHandler } from "express"
import rootRouter from "./routes/index"

const app = express()

app.use(express.json())


app.get('/',(req,res)=>{
    //throw new Error("Error Testing 123")
    res.send("hello from synkboard backend!")
})

app.use('/api/v1',rootRouter)

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Internal Server Error!"
    })
};
app.use(errorHandler);

app.listen(3001)