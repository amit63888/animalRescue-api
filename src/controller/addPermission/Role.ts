import { Request, Response } from "express";
import RolePermission from "../../model/addPermission/Role"

export const createRolePermission=async(req: Request, res: Response)=>{
    try { 
       const {role,permissions}=req.body;
         let data = new RolePermission({role,permissions}); 
         await data.save(); 
       return  res.status(200).json({
           code: 200,
           message: "Role Register successfully",
           data,
           error: false,
           status: true,
         });
       
     } catch (err) {
      return  res.status(500).json({
        code: 500,
        err,
        message: "Internal Server Error",
        error: true,
        status: false,
      });
     }
  } 

  export const getRolePermission = async (req: Request, res: Response) => {
    try { 
      const rolePermission = await RolePermission.find();
      if (!rolePermission) {
        return res.status(404).json({
          code: 404,
          message: "Role permission not found",
          error: true,
          status: false,
        });
      }
    return  res.status(200).json({
        code: 200,
        message: "Role permission found",
        data: rolePermission,
        error: false,
        status: true,
      });
    } catch (err) {
      console.error(err);
    return  res.status(500).json({
        code: 500,
        message: "Internal Server Error",
        error: true,
        status: false,
      });
    }
  };
  export const getRoleSinglePermission = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const rolePermission = await RolePermission.findById(id);
      if (!rolePermission) {
        return res.status(404).json({
          code: 404,
          message: "Role permission not found",
          error: true,
          status: false,
        });
      }
    return  res.status(200).json({
        code: 200,
        message: "Role permission found",
        data: rolePermission,
        error: false,
        status: true,
      });
    } catch (err) {
      console.error(err);
    return  res.status(500).json({
        code: 500,
        message: "Internal Server Error",
        error: true,
        status: false,
      });
    }
  };
  

export const deleteRolePermission = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedData = await RolePermission.findByIdAndDelete(id);
    if (!deletedData) {
      return res.status(404).json({
        code: 404,
        message: "Role permission not found",
        error: true,
        status: false,
      });
    }
  return  res.status(200).json({
      code: 200,
      message: "Role permission deleted successfully",
      data: deletedData,
      error: false,
      status: true,
    });
  } catch (err) {
    console.error(err);
  return  res.status(500).json({
      code: 500,
      message: "Internal Server Error",
      error: true,
      status: false,
    });
  }
};
 

export const updateRolePermission = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role, permissions } = req.body;
    const updatedData = await RolePermission.findByIdAndUpdate(
      id,
      { role, permissions },
      { new: true }
    );
    if (!updatedData) {
      return res.status(404).json({
        code: 404,
        message: "Role permission not found",
        error: true,
        status: false,
      });
    }
  return  res.status(200).json({
      code: 200,
      message: "Role permission updated successfully",
      data: updatedData,
      error: false,
      status: true,
    });
  } catch (err) {
    console.error(err);
  return  res.status(500).json({
      code: 500,
      message: "Internal Server Error",
      error: true,
      status: false,
    });
  }
};
