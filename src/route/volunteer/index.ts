import express from "express"; 
 const routes = express.Router();
 import {forgetPassword, loginUser, registerUser} from '../../controller/volunteer/index'
import { imgupload } from "../../middleware/multer";
import { requireSignIn } from "../../middleware";
// create post 
routes.post("/regiser",registerUser);
routes.post("/login",loginUser);
routes.post("/upload",requireSignIn,imgupload.single("img"),(req:any,res:any)=>{
   console.log(req.file,"00000000000000");
    res.send({e:req.user,file:req.file})
});

routes.post("/email",forgetPassword);
export default routes;

 