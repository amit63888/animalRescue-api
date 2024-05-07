import express from "express"; 
 const routes = express.Router();
 import {registerUser} from '../../controller/volunteer/index'
// create post 
routes.post("/regiser",registerUser);
 

export default routes;

 