import mongoose from "mongoose";

const addPermissionSchema = new mongoose.Schema({
  permissions: {
    type: [String],  
    default: [],
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default mongoose.model('AddPermission', addPermissionSchema);
