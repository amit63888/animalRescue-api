// AssigneeDetail
import mongoose, { Schema } from "mongoose";

const AssigneeDetailSchema = new mongoose.Schema({ 
 
  caseId: {
    type: Schema.Types.ObjectId,
    ref: 'Case'
  },  
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  comment: {
    type: String, 
  }, 
  attachment: {
    type: String, 
    required:true
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
 

module.exports = mongoose.model('AssigneeDetail', AssigneeDetailSchema);
