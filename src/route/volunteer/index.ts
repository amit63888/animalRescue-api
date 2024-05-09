// index.ts
import express from "express"; 
const routes = express.Router();
import { forgetPassword, loginUser, registerUser } from '../../controller/volunteer/index';
import { uploadImgFile } from "../../utills/upload";

// create post 
routes.post("/regiser", registerUser);
routes.post("/login", loginUser);
routes.post("/upload", async (req: any, res: any) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        } 
        const { file } = req.files;  
        const currentDir ='./src/upload';  
        const fullPath = await uploadImgFile(currentDir, file);  
        res.send({ message: 'File uploaded successfully', filePath: fullPath });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Internal Server Error');
    }
});

//test 
routes.post("/email", forgetPassword);
export default routes;
