import appRootPath from 'app-root-path';
import multer from 'multer';

const IMAGE_PATH = `${appRootPath}/src/assets/images`;

const imageFilter = (req, file, cb) => {
  if (file.mimetype.includes('image')) {
    cb(null, true);
  } else {
    cb({ message: 'Invalid image' }, false);
  }
};

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMAGE_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const memoryStorage = multer.memoryStorage();

export const uploadImageByDisk = multer({ storage: diskStorage, fileFilter: imageFilter });
export const uploadImageByMemory = multer({ storage: memoryStorage, fileFilter: imageFilter });
