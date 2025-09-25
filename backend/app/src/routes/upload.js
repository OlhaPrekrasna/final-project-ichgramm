
import express from 'express';
// import upload from '../middlewares/multer.js'; // ← важно: путь к вашему multer.js

//
// import { uploadPost } from '../controllers/postController.js';
// import { uploadUserPhoto } from '../controllers/userController.js';
//

const router = express.Router();

// router.post('/upload', upload.single('media'), (req, res) => {
//   try {
//     return res.json({
//       message: 'Файл успешно загружен',
//       url: req.file.location, // ссылка на файл в S3
//     });
//   } catch (err) {
//     return res.status(500).json({ error: 'Ошибка при загрузке файла' });
//   }
// });

// router.post('/posts/upload', uploadPost);
// router.post('/user/upload', uploadUserPhoto);


export default router;
