import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Photographer from '../models/photographerModel.js';
import Client from '../models/clientModel.js';
import LocationOwner from '../models/locationOwnerModel.js';
import PhClub from '../models/phClubModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Extract token from request header, cookie, or query parameter
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (req.query.token) {
    token = req.query.token;
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check the user type and fetch user accordingly
      let user;
      if (decoded.userType === 'photographer') {
        user = await Photographer.findById(decoded.userId).select('-password');
      } else if (decoded.userType === 'locationOwner') {
        user = await LocationOwner.findById(decoded.userId).select('-password');
      } else if (decoded.userType === 'client') {
        user = await Client.findById(decoded.userId).select('-password');
      } else if (decoded.userType === 'phClub') {
        user = await PhClub.findById(decoded.userId).select('-password');
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };
