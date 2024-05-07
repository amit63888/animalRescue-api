import express from "express"; 
import { addPermissionController, getPermissionController } from "../../controller/addPermission";
 const permissions = express.Router(); 
permissions.post("/addpermission",addPermissionController);
permissions.get("/addpermission",getPermissionController);
export default permissions;

 


 