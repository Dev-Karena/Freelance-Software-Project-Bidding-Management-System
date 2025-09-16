import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/db';
import { initializeSocketIo } from './realtime/socket';
import { createApp } from './app';

dotenv.config();

const app = createApp();
const server = http.createServer(app);
initializeSocketIo(server);

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/freelance';

connectToDatabase(MONGO_URL)
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  })
  .finally(() => {
    server.listen(PORT, () => {
      console.log(`Backend listening on port ${PORT}`);
    });
  });



