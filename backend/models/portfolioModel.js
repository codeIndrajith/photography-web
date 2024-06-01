import mongoose from 'mongoose';

const portfolioSchema = mongoose.Schema(
  {
    // profilePic: {
    //   type: String,
    //   required: true,
    // },
    shootImageSamples: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photographerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photographer',
    },
  },
  {
    timestamps: true,
  }
);

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

export default Portfolio;
