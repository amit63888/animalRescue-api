import mongoose, { Schema } from "mongoose";

const attachmentSchema = new mongoose.Schema({
  
  
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  caseId: {
    type: Schema.Types.ObjectId,
    ref: 'Case'
  },
  file: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    
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
 

module.exports = mongoose.model('Attachment', attachmentSchema);
