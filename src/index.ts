import express, { Request, Response } from "express";
import yenv from "yenv";
import cors from "cors"; 
import routes from "./route/volunteer";
import permissions from "./route/addPermission";
const app = express();
const env = yenv("env.yaml", { env: "development" });
app.use(express.json());//allow json
app.use(cors());//allow origin
//MongoDb Database connection
require('./config/connection'); 
/** Error handling */

app.use((req: Request, res: Response, next) => {
  next();
}); 
//routes
app.use("/auth/v1", routes);
app.use("/auth/v1", permissions);
app.get("/", (req: Request, res: Response) => {
  res.send("welcome to server !!!");
}); 
app.listen(env.PORT || 4610, () => {
  // tslint:disable-next-line
  console.log("Server is Running 🚀 at Port " + env.PORT);
});
