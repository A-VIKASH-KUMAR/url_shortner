import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  alias: {
    type: String,
    required: true,
    unique: true
  },
  longUrl: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    enum: ['acquisition', 'activation', 'retention', 'others'],
    default: null
  },
  customAlias: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date,
  isActive: {
    type: Boolean,
    default: true
  }
});

export const Url = mongoose.model("Url", urlSchema)