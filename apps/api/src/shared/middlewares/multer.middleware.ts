import multer from 'multer';
import path from 'path';

const getFileStorage = () => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname + '/assets/'));
    },
    filename: function (req, file, cb) {
      const d = new Date();
      cb(null, `${d.toISOString()}-${file.originalname}`);
    },
  });
};

export const ImageUpload = multer({
  storage: getFileStorage(),
});
