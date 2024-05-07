import mongoose from "mongoose";

const RolePermissionSchema = new mongoose.Schema({
    role: {
        type: String,  
        required:true
      },
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

export default mongoose.model('RolePermission', RolePermissionSchema);
