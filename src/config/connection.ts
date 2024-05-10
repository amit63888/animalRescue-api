import mongoose from 'mongoose'; 

// Connect to MongoDB
const url=process.env.MONGO_URL  
mongoose.connect(`${url}`);

// Get the default connection
const db = mongoose.connection;

// Event listeners for connection events

// When successfully connected
db.on('connected', () => {
  console.log("🚀 MongoDB connected successfully");
});

// If the connection throws an error
db.on('error', (err) => {
  console.error("❌ MongoDB connection error:", err);
});

// When the connection is disconnected
db.on('disconnected', () => {
  console.log("⚠️ MongoDB disconnected");
});

// If the Node.js process ends, close the Mongoose connection
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log("ℹ️ MongoDB connection closed due to Node.js process termination");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error closing MongoDB connection:", error);
    process.exit(1);
  }
});
