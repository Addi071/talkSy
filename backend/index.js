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

const PORT = process.env.port

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}))
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser())

app.use('/api/auth',authRoutes);
app.use('/api/message',messageRoutes);

server.listen(PORT || 5000 || 5002,()=>{

    console.log('Server is running on port '+ PORT);
    connectDB()
})