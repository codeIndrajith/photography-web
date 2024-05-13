import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const photographerSchema = mongoose.Schema(
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
    password: {
      type: String,
      required: true,
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
    portfolio: {
      type: String,
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Owner',
    },
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
photographerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
photographerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Photographer = mongoose.model('Photographer', photographerSchema);

export default Photographer;
