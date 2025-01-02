import mongoose from "mongoose"

const analyticsSchema = new mongoose.Schema({
    urlId: {
      type: String,
      ref: 'Url',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    device: {
      type: Object,
      required: true,
    },
    location: {
      type: Object,
    },
  });
  
  analyticsSchema.index({ urlId: 1, timestamp: 1 });
  
  export default mongoose.model('Analytics', analyticsSchema);