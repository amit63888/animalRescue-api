import mongoose, { Schema } from "mongoose"; 

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
    password: {
        type: String,
        required: true,
    }, 
    active: {
        type: Boolean,  
        default: false 
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

// Index the 'location' field for efficient geospatial queries
userSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Users', userSchema);
