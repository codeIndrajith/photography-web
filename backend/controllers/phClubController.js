import asyncHandler from 'express-async-handler';
import PhClub from '../models/phClubModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth PhClub & get token
// @route   POST /api/phClub/phClub-auth
// @access  Public
const authPhClub = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const phClub = await PhClub.findOne({ email });

  if (phClub && (await phClub.matchPassword(password))) {
    generateToken(res, phClub._id);

    res.json({
      _id: phClub._id,
      name: phClub.name,
      email: phClub.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new PhClub
// @route   POST /api/phClub
// @access  Public
const registerPhClub = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const phClubExists = await PhClub.findOne({ email });

  if (phClubExists) {
    res.status(400);
    throw new Error('PhClub already exists');
  }

  const phClub = await PhClub.create({
    name,
    email,
    password,
  });

  if (phClub) {
    generateToken(res, phClub._id);

    res.status(201).json({
      _id: phClub._id,
      name: phClub.name,
      email: phClub.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid PhClub data');
  }
});

export { authPhClub, registerPhClub };
