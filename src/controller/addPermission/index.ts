import { Request, Response } from "express";
import AddPermission from "../../model/addPermission/index"; // Import your Mongoose model
import { removeDuplicates } from "../../utills"; 
export const addPermissionController = async (req: Request, res: Response) => {
  try {
    const { permissions } = req.body; 
    let existingDoc = await AddPermission.findOne(); 
    if (!existingDoc) { 
      existingDoc = await AddPermission.create({});
    }  
    const newPermissions = await existingDoc?.permissions?.concat(permissions); 
    const permissionData = await removeDuplicates(newPermissions); 
    const updatedDoc = await AddPermission.findByIdAndUpdate(
      { _id: existingDoc._id }, 
      { permissions: permissionData }, 
      { new: true, upsert: true }
    );

    return res.status(200).json({
      code: 200,
       message: "Permissions updated successfully",
       updatedDoc,
      error: false,
      status: true,
    });
  } catch (err) {
    console.error("Error updating permissions:", err);
    return res.status(500).json({
      code: 500,
      message: "Internal Server Error",
      error: true,
      status: false,
    });
  }
};
export const getPermissionController = async (req: Request, res: Response) => {
  try { 
    const data = await AddPermission.findOne(); 
    return res.status(200).json({
      code: 200,
      message: "Permissions retrieved successfully",
      data, 
      error: false,
      status: true,
    });
  } catch (err) {
    console.error("Error in permissions:", err);
    return res.status(500).json({
      code: 500,
      message: "Internal Server Error",
      error: true,
      status: false,
    });
  }
};