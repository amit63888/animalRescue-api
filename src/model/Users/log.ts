import mongoose, { Schema } from "mongoose"; 
//Users
const logSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }, 
   time: {
        type: String,
        default: Date.now,  
        required: true,
      },
    activity: {
        type: String,
        required: true,
    },
    message: {
        type: String,
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

 

export default mongoose.model('Log', logSchema);
