import express from 'express';
import {
  authClient,
  registerClient,
  logoutClient,
  hirePhotographer,
} from '../controllers/clientController.js';

const router = express.Router();

router.post('/', registerClient);
router.post('/auth', authClient);
router.post('/logout', logoutClient);
router.post('/hire-photographer', hirePhotographer);

export default router;
