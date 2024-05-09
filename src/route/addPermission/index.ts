import express from "express"; 
import { addPermissionController, getPermissionController } from "../../controller/addPermission";
import { createRolePermission,getRolePermission,deleteRolePermission,updateRolePermission,getRoleSinglePermission } from "../../controller/addPermission/Role";
 const permissions = express.Router(); 
permissions.post("/addpermission",addPermissionController);
permissions.get("/addpermission",getPermissionController);
///Role & Permission
permissions.post("/role",createRolePermission);
permissions.get("/role/:id",getRoleSinglePermission);
permissions.get("/role",getRolePermission);
permissions.delete("/role/:id",deleteRolePermission);
permissions.put("/role/:id",updateRolePermission);

export default permissions;

 


 