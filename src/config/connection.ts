import mongoose from 'mongoose'; 

export const connectDB = async () => {
  try {
    const url = process.env.MONGO_URL; // MongoDB connection URL from environment variable
    await mongoose.connect(`${url}` );
    console.log("🚀 MongoDB connected successfully !!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Exit with failure
  }

  // Get the default connection
  const db = mongoose.connection; 

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
};

 
