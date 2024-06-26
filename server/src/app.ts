import express from 'express';
import mongoose from 'mongoose';
import {config} from './config/config'
import { errorHandler } from './middlewares/errorHandler';
import authRoutes from './routers/authRouter';
const bodyParser = require("body-parser");

const app=express();

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.use('/api', userRouter);
app.use('/api/auth',authRoutes)
app.use(errorHandler);



mongoose.connect(config.mongoURI).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

export default app;