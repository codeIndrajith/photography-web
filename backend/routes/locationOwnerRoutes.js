import express from 'express';
import {
  authLocationOwner,
  registerLocationOwner,
  logoutLocationOwner,
  addLocationByOwner,
  getLocationsByOwner,
  getAllLocations,
  getLocation,
  updateOwner,
  deleteLocation,
} from '../controllers/locationOwnerController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', registerLocationOwner);
router.post('/auth', authLocationOwner);
router.post('/logout', logoutLocationOwner);
router.put('/update-owner', updateOwner);
router.post('/addLocation', upload.array('images', 5), addLocationByOwner);
router.get('/getLocations/:locationOwnerId', getLocationsByOwner);
router.get('/', getAllLocations);
router.get('/:id', getLocation);
router.delete('/delete-location', deleteLocation);

export default router;
