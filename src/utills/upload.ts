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
