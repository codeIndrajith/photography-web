import asyncHandler from 'express-async-handler';
import LocationOwner from '../models/locationOwnerModel.js';
import Locations from '../models/locationsModel.js';
import generateToken from '../utils/generateToken.js';
import cloudinary from 'cloudinary';

// @desc    Auth user & get token
// @route   POST /api/locationOwner/auth
// @access  Public
const authLocationOwner = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const locationOwner = await LocationOwner.findOne({ email });

  if (locationOwner && (await locationOwner.matchPassword(password))) {
    generateToken(res, locationOwner._id);

    res.json({
      _id: locationOwner._id,
      name: locationOwner.firstName + ' ' + locationOwner.lastName,
      email: locationOwner.email,
      status: locationOwner.status,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/locationOwner
// @access  Public
const registerLocationOwner = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    whatsAppNumber,
    instagramLink,
    faceBookLink,
    status,
  } = req.body;

  // const imagesUrls = [];

  // for (const file of req.files) {
  //   try {
  //     const result = await cloudinary.uploader.upload(file.path);
  //     imagesUrls.push(result.secure_url);
  //   } catch (error) {
  //     console.error('Error uploading image to Cloudinary:', error);
  //     res.status(500);
  //     throw new Error('Error uploading image to Cloudinary');
  //   }
  // }

  const userExists = await LocationOwner.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const locationOwner = await LocationOwner.create({
    firstName,
    lastName,
    email,
    password,
    whatsAppNumber,
    instagramLink,
    faceBookLink,
    // images: imagesUrls,
    status,
  });

  if (locationOwner) {
    generateToken(res, locationOwner._id);

    res.status(201).json({
      _id: locationOwner._id,
      name: locationOwner.firstName + ' ' + locationOwner.lastName,
      email: locationOwner.email,
      status: locationOwner.status,
    });
  } else {
    res.status(400);
    throw new Error('Invalid location owner data');
  }
});

// @desc    Logout owner / clear cookie
// @route   POST /api/locationOwner/logout
// @access  Public
const logoutLocationOwner = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Add locations by owner
// @route   POST /api/addLocation
// @access  Public
const addLocationByOwner = async (req, res) => {
  const { locationName, locationAddress, locationOwnerId } = req.body;

  const imagesUrls = [];

  for (const file of req.files) {
    try {
      const result = await cloudinary.uploader.upload(file.path);
      imagesUrls.push(result.secure_url);
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      res.status(500);
      throw new Error('Error uploading image to Cloudinary');
    }
  }

  const location = await Locations.create({
    locationName,
    locationAddress,
    images: imagesUrls,
    locationOwnerId,
  });

  if (location) {
    res.status(201).json({
      _id: location._id,
      locationName: location.locationName,
      locationAddress: location.locationAddress,
    });
  } else {
    res.status(400);
    throw new Error('Invalid location details');
  }
};

// @desc    Get locations by owner
// @route   GET /api/getLocation/:locationOwnerId
// @access  Public
const getLocationsByOwner = async (req, res) => {
  const { locationOwnerId } = req.params;

  try {
    const locations = await Locations.find({
      locationOwnerId: locationOwnerId,
    });

    if (locations.length > 0) {
      res.status(200).json(
        locations.map((location) => ({
          _id: location._id,
          locationName: location.locationName,
          locationAddress: location.locationAddress,
        }))
      );
    } else {
      res.status(404).json({ message: 'No locations found' });
    }
  } catch (error) {
    res.status(500);
    throw new Error('Internal server error', error);
  }
};

// @desc    Get All Location
// @route   GET /api/getLocation
// @access  Public
const getAllLocations = asyncHandler(async (req, res) => {
  const locations = await Locations.find({});
  if (locations) {
    res.status(200).json(locations);
  } else {
    res.status(404);
    throw new Error('No locations found');
  }
});

export {
  authLocationOwner,
  registerLocationOwner,
  logoutLocationOwner,
  addLocationByOwner,
  getLocationsByOwner,
  getAllLocations,
};
