import asyncHandler from 'express-async-handler';
import LocationOwner from '../models/locationOwnerModel.js';
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
    images: imagesUrls,
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

export { authLocationOwner, registerLocationOwner, logoutLocationOwner };
