import express from 'express';
import {
  authLocationOwner,
  registerLocationOwner,
  logoutLocationOwner,
} from '../controllers/locationOwnerController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', upload.array('images', 5), registerLocationOwner);
router.post('/auth', authLocationOwner);
router.post('/logout', logoutLocationOwner);

export default router;
