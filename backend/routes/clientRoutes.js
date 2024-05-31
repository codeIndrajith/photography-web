import express from 'express';
import {
  authClient,
  registerClient,
  logoutClient,
  hirePhotographer,
  getAllHirePhotographers,
} from '../controllers/clientController.js';

const router = express.Router();

router.post('/', registerClient);
router.post('/auth', authClient);
router.post('/logout', logoutClient);
router.post('/hire-photographer', hirePhotographer);
router.get('/hire-photographers/:clientId', getAllHirePhotographers);

export default router;
