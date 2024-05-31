import mongoose from 'mongoose';

const bookingPhotographerSchema = mongoose.Schema(
  {
    photographerName: {
      type: String,
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
    },
    photographerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photographer',
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const bookingPhotographer = mongoose.model(
  'bookingPhotographer',
  bookingPhotographerSchema
);

export default bookingPhotographer;
