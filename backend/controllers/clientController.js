import asyncHandler from 'express-async-handler';
import Client from '../models/clientModel.js';
import generateToken from '../utils/generateToken.js';
import bookingPhotographer from '../models/bookingPhotographerModel.js';

// @desc    Auth client & get token
// @route   POST /api/client/auth
// @access  Public
const authClient = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const client = await Client.findOne({ email });

  if (client && (await client.matchPassword(password))) {
    generateToken(res, client._id);

    res.json({
      _id: client._id,
      name: client.firstName + ' ' + client.lastName,
      email: client.email,
      status: client.status,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new client
// @route   POST /api/client
// @access  Public
const registerClient = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, status } = req.body;

  const clientExists = await Client.findOne({ email });

  if (clientExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const client = await Client.create({
    firstName,
    lastName,
    email,
    password,
    status,
  });

  if (client) {
    generateToken(res, client._id);

    res.status(201).json({
      _id: client._id,
      name: client.firstName + ' ' + client.lastName,
      email: client.email,
      status: client.status,
    });
  } else {
    res.status(400);
    throw new Error('Invalid client data');
  }
});

// @desc    Logout client / clear cookie
// @route   POST /api/client/logout
// @access  Public
const logoutClient = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Hire a photographer
// @route   POST /api/hire-photographer
// @access  Public
const hirePhotographer = asyncHandler(async (req, res) => {
  const { description, clientId, photographerId, photographerName } = req.body;

  const hire_photographer = await bookingPhotographer.create({
    photographerName,
    description,
    clientId,
    photographerId,
  });

  if (hire_photographer) {
    res.status(201).json({
      name: hire_photographer.photographerName,
      _id: hire_photographer._id,
      time: hire_photographer.createdAt,
    });
  } else {
    res.status(400);
    throw new Error('Invalid Hiring data');
  }
});

// @desc    Get hire a photographers by client
// @route   GET /api/hire-photographer/:clientId
// @access  Public
const getAllHirePhotographers = asyncHandler(async (req, res) => {
  const { clientId } = req.params;

  const photographers = await bookingPhotographer.find({ clientId: clientId });

  if (photographers.length > 0) {
    res.status(200).json(
      photographers.map((photographer) => ({
        _id: photographer._id,
        photographerName: photographer.photographerName,
        createdAt: photographer.createdAt,
      }))
    );
  } else {
    res.status(500);
    throw new Error('Internal server error', error);
  }
});

export {
  authClient,
  registerClient,
  logoutClient,
  hirePhotographer,
  getAllHirePhotographers,
};
