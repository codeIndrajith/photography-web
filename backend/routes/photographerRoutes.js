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
  updatePhotographer,
} from '../controllers/photographerController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', upload.single('profilePic'), registerPhotographer);
router.post('/auth', authPhotographer);
router.put(
  '/update-photographer',
  upload.single('profilePic'),
  updatePhotographer
);
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
router.get('/get-rating/:photographerId', getRatings);

export default router;
