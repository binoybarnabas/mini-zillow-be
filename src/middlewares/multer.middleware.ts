import multer from 'multer';

const storage = multer.memoryStorage(); // we’ll send file buffer directly to Cloudinary
export const upload = multer({ storage });
