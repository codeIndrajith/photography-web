import express from 'express';
import {
  authClient,
  registerClient,
  logoutClient,
  hirePhotographer,
  getAllHirePhotographers,
  addRating,
} from '../controllers/clientController.js';

const router = express.Router();

router.post('/', registerClient);
router.post('/auth', authClient);
router.post('/logout', logoutClient);
router.post('/hire-photographer', hirePhotographer);
router.get('/hire-photographers/:clientId', getAllHirePhotographers);
router.post('/add-rating', addRating);

export default router;
