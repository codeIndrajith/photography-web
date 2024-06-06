import mongoose from 'mongoose';

const ratingSchema = mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
    },
    photographerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photographer',
    },
    ratingCount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ratings = mongoose.model('Ratings', ratingSchema);

export default Ratings;
