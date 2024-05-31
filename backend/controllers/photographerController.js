import asyncHandler from 'express-async-handler';
import Photographer from '../models/photographerModel.js';
import generateToken from '../utils/generateToken.js';
import cloudinary from 'cloudinary';
import Portfolio from '../models/portfolioModel.js';
import bookingLocation from '../models/bookingLocationModel.js';

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
      status: photographer.status,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
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
    status,
  } = req.body;

  // const portfolio = req.file.path;
  // const result = await cloudinary.uploader.upload(portfolio);
  // const portfolioUrl = result.secure_url;

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
    // portfolio: portfolioUrl,
    status,
  });

  if (photographer) {
    generateToken(res, photographer._id);

    res.status(201).json({
      _id: photographer._id,
      firstName: photographer.firstName,
      lastName: photographer.lastName,
      email: photographer.email,
      portfolio: photographer.portfolio,
      status: photographer.status,
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

// @desc    Add portfolio
// @route   POST /api/photographer/portfolio
// @access  Public
const addPortfolioByPhotographer = asyncHandler(async (req, res) => {
  const { description, photographerId } = req.body;

  const image = req.files['profilePic'][0];

  const result = await cloudinary.uploader.upload(image.path);
  const coverImageUrl = result.secure_url;

  const imageUrls = [];

  for (const file of req.files['shootImageSamples']) {
    const result = await cloudinary.uploader.upload(file.path);
    imageUrls.push(result.secure_url);
  }

  const portfolio = await Portfolio.create({
    profilePic: coverImageUrl,
    shootImageSamples: imageUrls,
    description,
    photographerId,
  });

  if (portfolio) {
    res.status(201).json({
      _id: portfolio._id,
    });
  } else {
    res.status(400);
    throw new Error('Invalid portfolio details');
  }
});

// @desc    Get portfolio
// @route   GET /api/photographer/:id
// @access  Public
const getPortfolioByPhotographer = asyncHandler(async (req, res) => {
  const { photographerId } = req.params;

  const photographerDetails = await Portfolio.find({
    photographerId: photographerId,
  });

  if (photographerDetails.length > 0) {
    res.status(200).json(
      photographerDetails.map((photographerDetail) => ({
        _id: photographerDetail._id,
        description: photographerDetail.description,
        profilePic: photographerDetail.profilePic,
        shootImageSamples: photographerDetail.shootImageSamples,
      }))
    );
  } else {
    res.status(404).json({ message: 'No photographer details found' });
  }
});

// @desc    Get Photographer
// @route   GET /api/photographers/:id
// @access  Private
const getPhotographer = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const photographer = await Photographer.findById(id);

  if (photographer) {
    res.status(201).json({
      firstName: photographer.firstName,
      lastName: photographer.lastName,
      email: photographer.email,
    });
  } else {
    res.status(404);
    throw new Error('Photographer not found');
  }
});

// @desc    Add booking locations
// @route   POST /api/photographers/add-booking
// @access  Private
const addBookingLocation = asyncHandler(async (req, res) => {
  const { locationId, name, email, date, message, photographerId } = req.body;

  const booking = await bookingLocation.create({
    locationId,
    photographerId,
    name,
    email,
    date,
    message,
  });

  if (booking) {
    res.status(201).json({
      _id: booking._id,
    });
  } else {
    res.status(400);
    throw new Error('Invalid booking location details');
  }
});
export {
  authPhotographer,
  registerPhotographer,
  logoutPhotographer,
  addPortfolioByPhotographer,
  getPortfolioByPhotographer,
  getPhotographer,
  addBookingLocation,
};
