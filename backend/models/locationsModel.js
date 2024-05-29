import mongoose from 'mongoose';

const locationsSchema = mongoose.Schema(
  {
    locationName: {
      type: String,
      required: true,
    },
    locationAddress: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    locationOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LocationOwner',
    },
  },
  {
    timestamps: true,
  }
);

const Locations = mongoose.model('Locations', locationsSchema);

export default Locations;
