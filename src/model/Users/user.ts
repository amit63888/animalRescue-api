import mongoose, { Schema } from "mongoose"; 

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    roleId: {
        type: Schema.Types.ObjectId,
        ref: 'RolePermission'
    },    
    photo: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'], // 'location' must be a GeoJSON Point
            required: true
        },
        coordinates: {
            type: [Number], // array of numbers, [longitude, latitude]
            required: true
        }
    },
    radius: {
        type: Number,
        required: true,
    }, 
    status: {
        type: Number,
        default: 0,  
        enum: [0, 1, 90]  
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

// Index the 'location' field for efficient geospatial queries
userSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Users', userSchema);
