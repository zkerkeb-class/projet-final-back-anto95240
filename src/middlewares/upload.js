import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // On génère un nom unique (ex: userId + date + extension)
    const ext = path.extname(file.originalname);
    cb(null, req.params.id + '-' + Date.now() + ext);
  }
});

const fileFilter = (req, file, cb) => {
  // Accepter uniquement les images
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Seules les images sont autorisées'), false);
  }
};

export const upload = multer({ storage, fileFilter });
