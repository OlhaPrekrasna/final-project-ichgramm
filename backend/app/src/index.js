import express from 'express';
import cors from 'cors';

import healthRoutes from './routes/healthRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

import postRoutes from './routes/postRoutes.js';
// import commentRoutes from './routes/commentRoutes.js';
// import messageRoutes from './routes/messageRoutes.js';
// import searchRoutes from './routes/searchRoutes.js';
// import likeRoutes from './routes/likeRoutes.js';
// import notificationRoutes from './routes/notificationRoutes.js';
// import followRoutes from './routes/followRoutes.js';

// import uploadRoutes from './routes/upload.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);

app.use('/api/v1/posts', postRoutes);
// app.use('/api/comments', commentRoutes);
// app.use('/api/messages', messageRoutes);
// app.use('/api/search', searchRoutes);
// app.use('/api/likes', likeRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/follow', followRoutes);
// app.use('/api/upload', uploadRoutes); // POST /api/upload

const port = process.env.NODE_PORT;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

export default app;

// POST http://localhost:5000/api/upload
