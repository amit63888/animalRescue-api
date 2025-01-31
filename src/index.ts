import express, { Request, Response } from "express"; 
import cors from "cors";
import fileUpload from 'express-fileupload'
import UserRoute from "./route/Users";//user management
import permissionsRoute from "./route/addPermission";//Role & Permissions
import dotenv from 'dotenv'; // Import dotenv package
import { connectDB } from "./config/connection";
// Load environment variables from .env file
dotenv.config(); 

const app = express(); 

// Middleware
app.use(express.json()); // Parse incoming request bodies as JSON
app.use(cors()); // Enable CORS for all routes
app.use(fileUpload()); // Enable file upload middleware , from here we can access the the express-file-upload any where 

// PORT
const PORT = process.env.PORT || 4610  ; // Use PORT from environment variable or default to 4610

// Database connection
 connectDB() 

/** Error handling middleware */
app.use((req: Request, res: Response, next) => {
  next();
});

// Routes
app.use("/auth/v1", UserRoute);
app.use("/auth/v1", permissionsRoute); 

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the server!!");
});

// Start server
app.listen(PORT, () => {
  console.log("Server is running 🚀 at Port " + PORT);
});
