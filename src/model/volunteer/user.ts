import mongoose from "mongoose"; 
const userSchema = new mongoose.Schema({
      
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
     
    
}); 
module.exports = mongoose.model('Users',userSchema);
