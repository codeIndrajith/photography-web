import asyncHandler from 'express-async-handler';
import Photographer from '../models/photographerModel.js';
import generateToken from '../utils/generateToken.js';
import cloudinary from 'cloudinary';
import Portfolio from '../models/portfolioModel.js';
import bookingLocation from '../models/bookingLocationModel.js';
import Ratings from '../models/ratingsModel.js';

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

  const image = req.file.path;
  const result = await cloudinary.uploader.upload(image);
  const profilePicUrl = result.secure_url;

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
    profilePic: profilePicUrl,
    status,
  });

  if (photographer) {
    generateToken(res, photographer._id);

    res.status(201).json({
      _id: photographer._id,
      firstName: photographer.firstName,
      lastName: photographer.lastName,
      email: photographer.email,
      profilePic: photographer.profilePic,
      status: photographer.status,
    });
  } else {
    res.status(400);
    throw new Error('Invalid photographer data');
  }
});

// @desc    Update photographer
// @route   PUT /api/photographers/update-photographer
// @access  Public
const updatePhotographer = asyncHandler(async (req, res) => {
  const {
    _id,
    firstName,
    lastName,
    email,
    password,
    whatsAppNumber,
    instagramLink,
    faceBookLink,
  } = req.body;

  const image = req.file.path;
  const result = await cloudinary.uploader.upload(image);
  const profilePicUrl = result.secure_url;

  const photographer = await Photographer.findById(_id);
  if (photographer) {
    photographer.firstName = firstName || photographer.firstName;
    photographer.lastName = lastName || photographer.lastName;
    photographer.email = email || photographer.email;
    photographer.whatsAppNumber = whatsAppNumber || photographer.whatsAppNumber;
    photographer.instagramLink = instagramLink || photographer.instagramLink;
    photographer.faceBookLink = faceBookLink || photographer.faceBookLink;
    photographer.profilePic = profilePicUrl;

    if (password) {
      photographer.password = password;
    }

    const updatePhotographer = await photographer.save();

    res.status(201).json({
      _id: updatePhotographer._id,
      name: updatePhotographer.firstName + ' ' + updatePhotographer.lastName,
      email: updatePhotographer.email,
      status: photographer.status,
    });
  } else {
    res.status(404);
    throw new Error('Photographer not found');
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

  // const image = req.files['profilePic'][0];

  // const result = await cloudinary.uploader.upload(image.path);
  // const coverImageUrl = result.secure_url;

  const imageUrls = [];

  for (const file of req.files) {
    const result = await cloudinary.uploader.upload(file.path);
    imageUrls.push(result.secure_url);
  }

  const portfolio = await Portfolio.create({
    // profilePic: coverImageUrl,
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
        // profilePic: photographerDetail.profilePic,
        shootImageSamples: photographerDetail.shootImageSamples,
      }))
    );
  } else {
    res.status(404).json({ message: 'No photographer details found' });
  }
});

// @desc    Delete portfolio
// @route   DELETE /api/photographer/delete-portfolio/:id
// @access  Public
const deletePortfolio = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400);
    throw new Error('Portfolio ID is required');
  }
  const portfolio = await Portfolio.findByIdAndDelete(id);
  if (portfolio) {
    res.status(200).json({ message: 'Portfolio deleted successfully' });
  } else {
    res.status(404);
    throw new Error('Portfolio not found');
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
      whatsAppNumber: photographer.whatsAppNumber,
      faceBookLink: photographer.faceBookLink,
      instagramLink: photographer.instagramLink,
      profilePic: photographer.profilePic,
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

// @desc    Get booking locations
// @route   GET /api/photographers/get-booking/:id
// @access  Private
const getBookingByPhotographer = asyncHandler(async (req, res) => {
  const photographerId = req.params;

  const getBookings = await bookingLocation.find(photographerId);

  if (getBookings.length > 0) {
    res.status(200).json(
      getBookings.map((getBooking) => ({
        _id: getBooking._id,
        name: getBooking.name,
        Date: getBooking.date,
      }))
    );
  } else {
    res.status(404).json({ message: 'No Booking details found' });
  }
});

// @desc    Delete booking
// @route   DELETE /api/photographer/delete-booking
// @access  Public
const deleteBooking = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    res.status(400);
    throw new Error('Id is required');
  }

  const deleteBookingLocation = await bookingLocation.findByIdAndDelete(id);
  if (deleteBookingLocation) {
    res.status(200).json({ message: 'Booking Location delete success' });
  } else {
    res.status(404);
    throw new Error('No found booking location');
  }
});
// @desc    Get All photographers
// @route   GET /api/photographers
// @access  Public
const getAllPhotographers = asyncHandler(async (req, res) => {
  const photographers = await Photographer.find({});

  if (photographers) {
    res.status(200).json(photographers);
  } else {
    res.status(404);
    throw new Error('Not found photographers');
  }
});

// @desc    Get Ratings
// @route   GET /api/photographer/get-ratings/:id
// @access  Private
const getRatings = asyncHandler(async (req, res) => {
  const { photographerId } = req.params;

  const ratings = await Ratings.find({ photographerId });

  if (ratings.length > 0) {
    res.status(200).json(
      ratings.map((rating) => ({
        _id: rating._id,
        ratingCount: rating.ratingCount,
      }))
    );
  } else {
    res.status(404).json({ message: 'No Rating details found' });
  }
});
export {
  authPhotographer,
  registerPhotographer,
  updatePhotographer,
  logoutPhotographer,
  addPortfolioByPhotographer,
  getPortfolioByPhotographer,
  deletePortfolio,
  getPhotographer,
  addBookingLocation,
  getBookingByPhotographer,
  deleteBooking,
  getAllPhotographers,
  getRatings,
};
