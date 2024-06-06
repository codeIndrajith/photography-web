import express from 'express';
import {
  authPhotographer,
  registerPhotographer,
  logoutPhotographer,
  addPortfolioByPhotographer,
  getPortfolioByPhotographer,
  getPhotographer,
  addBookingLocation,
  getBookingByPhotographer,
  getAllPhotographers,
  getRatings,
} from '../controllers/photographerController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', upload.single('profilePic'), registerPhotographer);
router.post('/auth', authPhotographer);
router.post('/logout', logoutPhotographer);
router.post(
  '/addPortfolio',
  upload.array('shootImageSamples', 5),
  addPortfolioByPhotographer
);
router.get('/getPortfolio/:photographerId', getPortfolioByPhotographer);
router.get('/:id', getPhotographer);
router.post('/add-booking', addBookingLocation);
router.get('/get-booking/:photographerId', getBookingByPhotographer);
router.get('/', getAllPhotographers);
router.get('/get-rating/:id', getRatings);

export default router;
