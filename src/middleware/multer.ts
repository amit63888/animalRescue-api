import multer, { StorageEngine } from "multer";
import { Request } from "express";

const storage: StorageEngine = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
      cb(null, './src/upload');
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
      const fileName = Date.now() + file.originalname.replace(/\s+/g, '_');
      cb(null, fileName);
    }
  });

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const imgupload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50 // fileSize instead of filesize
  },
  fileFilter: fileFilter
});

 
