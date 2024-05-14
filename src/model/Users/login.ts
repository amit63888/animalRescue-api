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
         
    },
   currentLogin: {
        type: String,
        required: true,
    },

    lastLoginTime: {
        type: Date,  
        required: true,
        default: Date.now  
      },
      currentLoginTime: {
        type: Date,  
        required: true,
        default: Date.now  
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

 

export default mongoose.model('Login', loginSchema);
