import express from "express"; 
import { addPermissionController } from "../../controller/addPermission";
 const permissions = express.Router(); 
permissions.post("/addpermission",addPermissionController);
 
export default permissions;

 


 