import asyncHandler from 'express-async-handler';
import Photographer from '../models/photographerModel.js';
import generateToken from '../utils/generateToken.js';
import cloudinary from 'cloudinary';

// @desc    Auth photographer & get token
// @route   POST /api/photographer/auth
// @access  Public
const authPhotographer = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const photographer = await Photographer.findOne({ email });

  if (photographer && (await photographer.matchPassword(password))) {
    generateToken(res, photographer._id);

    res.json({
      _id: photographer._id,
      name: photographer.firstName + ' ' + photographer.lastName,
      email: photographer.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  res.status(200).json({ message: 'Login photographer' });
});

// @desc    Register a new photographer
// @route   POST /api/photographer
// @access  Public
const registerPhotographer = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    whatsAppNumber,
    instagramLink,
    faceBookLink,
  } = req.body;

  const portfolio = req.file.path;
  const result = await cloudinary.uploader.upload(portfolio);
  const portfolioUrl = result.secure_url;

  const userExists = await Photographer.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const photographer = await Photographer.create({
    firstName,
    lastName,
    email,
    password,
    whatsAppNumber,
    instagramLink,
    faceBookLink,
    portfolio: portfolioUrl,
  });

  if (photographer) {
    generateToken(res, photographer._id);

    res.status(201).json({
      _id: photographer._id,
      firstName: photographer.firstName,
      lastName: photographer.lastName,
      email: photographer.email,
      portfolio: photographer.portfolio,
    });
  } else {
    res.status(400);
    throw new Error('Invalid photographer data');
  }
});

// @desc    Logout photographer / clear cookie
// @route   POST /api/photographer/logout
// @access  Public
const logoutPhotographer = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

export { authPhotographer, registerPhotographer, logoutPhotographer };
