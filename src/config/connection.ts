import mongoose from 'mongoose'
import yenv from "yenv";
const env = yenv("env.yaml", { env: "development" });
mongoose.connect( env.MONGO_URL); 
// Get the default connection
const db = mongoose.connection;
if(db){
    console.log(" 🚀 DB connected succeessfully");
    

}