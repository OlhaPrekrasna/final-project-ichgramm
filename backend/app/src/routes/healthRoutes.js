import express from 'express';
import {
  healthCheck,
  healthWithDbCheck,
} from '../controllers/healthController.js';

const router = express.Router();

router.get('/', healthCheck);
router.get('/db', healthWithDbCheck);

export default router;
