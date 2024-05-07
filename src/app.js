import express from 'express';
import http from 'http';
const app = express();
const port = 4000;
const server = http.createServer(app);
import CustomError from './customError.js';
import AppRouter from './route/appRouter.js';
import UserRouter from './route/userRouter.js';
import AuthRouter from './route/authRouter.js';
import { test } from './middleware/test.js';
import { connectDb } from './dbConnection/connect.js';
import { verifyToken } from './middleware/auth.js';
app.use(express.json());

(async () => {
    try {
        await connectDb();
        server.listen(port, (err) => {
            if (err) {
                console.log(err.message)
            } else {
                console.log('Server connected')
            }
        })
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
})()
// app.use(test)
app.use('/', AppRouter)
app.use('/auth', AuthRouter)
app.use('/users', verifyToken, UserRouter)

app.use(function (req, res, next) {
    const newError = new CustomError('Route Not Found', 404)
    next(newError)
})
app.use(function (err, req, res, next) {
    res.status(200).json({ status: err.status || 400, message: err.message })
})
    
