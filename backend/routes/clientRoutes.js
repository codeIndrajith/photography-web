import express from 'express';
import {
  authClient,
  registerClient,
  logoutClient,
} from '../controllers/clientController.js';

const router = express.Router();

router.post('/', registerClient);
router.post('/auth', authClient);
router.post('/logout', logoutClient);

export default router;
