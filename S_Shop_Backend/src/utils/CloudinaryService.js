import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/SetCloudinary";

export function createStorage(folderName, format) {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folderName,
      format: format,
    },
  });
}
