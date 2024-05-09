 import path from "path";
export const uploadImgFile = (uploadPath: string, file: any) => {
  return new Promise<string>((resolve, reject) => {
    const fileName = file.name.replace(/\s+/g, '_');  
    const filePath = path.join(uploadPath, fileName); // Construct the upload path
    file.mv(filePath, (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(filePath);
      }
    });
  });
};
 export const validateFile = (file: any) => {
  // Define allowed file types
  const allowedTypes = ['image/jpeg','image/png'];
  // Define max file size (in bytes)
  const maxSize = 5 * 1024 * 1024;  
  if (!allowedTypes.includes(file.mimetype)) {
      return 'Invalid file type. Only JPEG and PNG files are allowed.';
  } 
  if (file.size > maxSize) {
      return 'File size exceeds the maximum allowed size of 5 MB.';
  } 
  return null;
};