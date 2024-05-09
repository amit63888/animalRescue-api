// index.ts
import express from "express"; 
const routes = express.Router();
import { forgetPassword, loginUser, registerUser } from '../../controller/volunteer/index';
import { uploadImgFile, validateFile } from "../../utills/upload";

// create post 
routes.post("/regiser", registerUser);
routes.post("/login", loginUser);
routes.post("/upload", async (req: any, res: any) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        } 
        const { file } = req.files;  
        const validationError = await validateFile(file);
        if (validationError) {
            return res.status(404).json({
                code: 404,
                message: validationError,
                error: true,
                status: false,
              });
        }
        const currentDir ='./src/upload';  
        const fullPath = await uploadImgFile(currentDir, file);  
        return res.status(200).json({
            code: 200,
            status: true,
            data: fullPath,
            message: 'File uploaded successfully',
            error: false,
          });
    } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).send('Internal Server Error');
    }
});

//test 
routes.post("/email", forgetPassword);
export default routes;
