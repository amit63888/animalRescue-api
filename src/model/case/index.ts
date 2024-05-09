import mongoose, { Schema } from "mongoose"; 
const CaseSchema = new mongoose.Schema({
      
      fname: {
        type: String,
        required: true,
      },
      
      lname: {
        type: String,
        required: true,
      },
      contact: {
        type: Number,
        required: true,
      },
      roleId: {
        type: Schema.Types.ObjectId,
        ref: 'RolePermission'
      },
     
      email: {
        type: String,
        required: true,
      },   
      profile: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      }, 
      active: {
        type: String,  
        default:false 
      },
      otp: {
        type: String,
       
      },
      token: {
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
module.exports = mongoose.model('Case',CaseSchema);