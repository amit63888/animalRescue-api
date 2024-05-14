import mongoose, { Schema } from "mongoose"; 
//Users
const loginSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }, 
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String, 
    },
    otp: {
        type: String, 
    },
     
    lastLogin: {
        type: String,
        required: true,
    },
   currentLogin: {
        type: String,
        required: true,
    },

    lastLoginTime: {
        type: String,
        default: Date.now,  
        required: true,
      },
      currentLoginTime: {
        type: String,
        default: Date.now,  
        required: true,
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

 

module.exports = mongoose.model('Login', loginSchema);
