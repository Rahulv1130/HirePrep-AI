import express from 'express'
import cors from 'cors'

import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';
import interviewRouter from './routes/interview.routes.js';

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.set("trust proxy", 1);

// Router to handle all the authentication requests
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter);


export default app;