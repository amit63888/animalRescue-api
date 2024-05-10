import mongoose, { Schema } from "mongoose";

const caseSchema = new mongoose.Schema({
  attachment: {
    type: [String],
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'], // 'location' must be a GeoJSON Point
      required: true
    },
    coordinates: {
      type: [Number], // array of numbers, [longitude, latitude]
      required: true
    }
  },

  landmark: {
    type: String,
    required: true,
  },
  reportedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  }, 

  isFraud: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

// Index the 'location' field for efficient geospatial queries
caseSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Case', caseSchema);
