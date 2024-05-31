import express from 'express';
import {
  authPhotographer,
  registerPhotographer,
  logoutPhotographer,
  addPortfolioByPhotographer,
  getPortfolioByPhotographer,
  getPhotographer,
  addBookingLocation,
} from '../controllers/photographerController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', upload.single('portfolio'), registerPhotographer);
router.post('/auth', authPhotographer);
router.post('/logout', logoutPhotographer);
router.post(
  '/addPortfolio',
  upload.fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'shootImageSamples', maxCount: 5 },
  ]),
  addPortfolioByPhotographer
);
router.get('/getPortfolio/:photographerId', getPortfolioByPhotographer);
router.get('/:id', getPhotographer);
router.post('/add-booking', addBookingLocation);

export default router;
