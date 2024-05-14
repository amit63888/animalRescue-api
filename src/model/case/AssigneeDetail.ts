// AssigneeDetail
import mongoose, { Schema } from "mongoose";

const AssigneeDetailSchema = new mongoose.Schema({ 
 
  caseId: {
    type: Schema.Types.ObjectId,
    ref: 'Case'
  }, 
  assignedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  note: {
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
 

module.exports = mongoose.model('AssigneeDetail', AssigneeDetailSchema);
