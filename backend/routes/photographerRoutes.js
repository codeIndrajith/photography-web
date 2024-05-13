import express from 'express';
import {
  authPhotographer,
  registerPhotographer,
  logoutPhotographer,
} from '../controllers/photographerController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', upload.single('portfolio'), registerPhotographer);
router.post('/auth', authPhotographer);
router.post('/logout', logoutPhotographer);

export default router;
