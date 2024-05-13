import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const locationOwnerSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    whatsAppNumber: {
      type: Number,
      required: true,
    },
    instagramLink: {
      type: String,
      required: true,
    },
    faceBookLink: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    photographer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photographer',
    },
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
locationOwnerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
locationOwnerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const LocationOwner = mongoose.model('Owner', locationOwnerSchema);

export default LocationOwner;
