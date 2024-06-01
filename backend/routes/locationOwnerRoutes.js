import express from 'express';
import {
  authLocationOwner,
  registerLocationOwner,
  logoutLocationOwner,
  addLocationByOwner,
  getLocationsByOwner,
  getAllLocations,
} from '../controllers/locationOwnerController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', registerLocationOwner);
router.post('/auth', authLocationOwner);
router.post('/logout', logoutLocationOwner);
router.post('/addLocation', upload.array('images', 5), addLocationByOwner);
router.get('/getLocations/:locationOwnerId', getLocationsByOwner);
router.get('/', getAllLocations);

export default router;
