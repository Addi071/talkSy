// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import { app, server } from './lib/socket.js';

dotenv.config();

const PORT = process.env.PORT

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}))
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser())

app.use('/api/auth',authRoutes);
app.use('/api/message',messageRoutes);

server.listen(PORT,()=>{

    console.log('Server is running on port '+ PORT);
    connectDB()
})
