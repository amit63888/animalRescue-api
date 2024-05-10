import express from "express"; 
import { addPermissionController, getPermissionController } from "../../controller/addPermission";
import { createRolePermission,getRolePermission,deleteRolePermission,updateRolePermission,getRoleSinglePermission } from "../../controller/addPermission/Role";
 const permissionsRoute = express.Router(); 
permissionsRoute.post("/addpermission",addPermissionController);
permissionsRoute.get("/addpermission",getPermissionController);
///Role & Permission
permissionsRoute.post("/role",createRolePermission);
permissionsRoute.get("/role/:id",getRoleSinglePermission);
permissionsRoute.get("/role",getRolePermission);
permissionsRoute.delete("/role/:id",deleteRolePermission);
permissionsRoute.put("/role/:id",updateRolePermission);

export default permissionsRoute;

 


 