

import cookieParser from 'cookie-parser' ;
import express from'express'
import  cors  from 'cors';
import { config } from 'dotenv';
config();
import userRoutes from './routes/user.routes.js';
import errorMiddleware from './middleware/error.middleware.js';

const app=express();

app.use(express.json());


//Its a middleware to join which are at different url
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true
}));


// cookies for storing user id  in cookies
app.use(cookieParser());
//Its for checking server is on or up
app.use('/ping',function(req,res){
    res.send('/pong');
})



app.use('/api/v1/user',userRoutes)
app.use(errorMiddleware);


app.all('*', (req,res)=>
{
    res.status(404).send("oopss 404 thid url dont found");
    
})


//routes for 3 modules

app.use(errorMiddleware);


export default app;




