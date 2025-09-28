import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

import healthRoutes from './routes/healthRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import followRoutes from './routes/followRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

import {
  notificationSocketHandler,
  authenticateSocket,
  messageSocketHandler,
} from './middlewares/notificationsSocket.js';

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  },
});

app.set('io', io); // чтобы использовать io в контроллерах

app.use(express.static('public'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/follow', followRoutes);
app.use('/api/v1/messages', messageRoutes);

io.on('connection', (socket) => {
  console.log('Пользователь подключился к WebSocket');

  // Подключаем уведомления
  notificationSocketHandler(socket, io);

  // Подключаем чат — нужно авторизовать
  authenticateSocket(socket, (err) => {
    if (err) {
      console.log('Ошибка авторизации сокета:', err.message);
      socket.disconnect();
      return;
    }
    console.log('Пользователь авторизован для чата:', socket.user.username);
    messageSocketHandler(socket, io);
  });

  socket.on('disconnect', () => {
    console.log('Пользователь отключился от WebSocket');
  });
});

const port = process.env.NODE_PORT || 3001;
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default app;
