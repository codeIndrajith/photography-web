import asyncHandler from 'express-async-handler';
import Client from '../models/clientModel.js';
import generateToken from '../utils/generateToken.js';

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
  const { firstName, lastName, email, password } = req.body;

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
  });

  if (client) {
    generateToken(res, client._id);

    res.status(201).json({
      _id: client._id,
      name: client.firstName + ' ' + client.lastName,
      email: client.email,
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

export { authClient, registerClient, logoutClient };
