import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
import route from './routes/UserRoute.js';

const app=express();
app.use(bodyParser.json())

const PORT=process.env.PORT || 5000;
const MONGO_URI=process.env.MONGO_URI;

mongoose.connect(MONGO_URI).then(()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT,()=>console.log(`Server is connected to ${PORT}`));
}).catch((err)=>
    console.log(err)) 

app.use("/api",route);