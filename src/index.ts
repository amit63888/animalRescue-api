import express, { Request, Response } from "express";
import yenv from "yenv";
import cors from "cors";
import fileUpload from 'express-fileupload'
import routes from "./route/volunteer";
import permissions from "./route/addPermission";

const app = express();
const env = yenv("env.yaml", { env: "development" });

// Middleware
app.use(express.json()); // Parse incoming request bodies as JSON
app.use(cors()); // Enable CORS for all routes
app.use(fileUpload()); // Enable file upload middleware

// PORT
const PORT = env.PORT || 4610;

// Database connection
require('./config/connection'); // Assuming your database connection setup is in this file

/** Error handling middleware */
app.use((req: Request, res: Response, next) => {
  next();
});

// Routes
// Assuming routes are correctly defined and imported
app.use("/auth/v1", routes);
app.use("/auth/v1", permissions); 

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the server!!");
});

// Start server
app.listen(PORT, () => {
  console.log("Server is running 🚀 at Port " + PORT);
});
