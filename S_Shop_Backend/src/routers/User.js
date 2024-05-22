import express from "express";
import { checkToken } from "../middleware/index";
import multer from "multer";
import { createStorage } from "../utils/CloudinaryService";
import {
  changePassword,
  profile,
  updateProfile,
  uploadAvatar,
} from "../controllers/User";
import { upload } from "../config/ConfigStogare";
const router = express.Router();

// const upload = multer({ storage: createStorage("user", "png") });

router.get("/", checkToken, profile);
router.put("/", checkToken, updateProfile);
router.put(
  "/upload-avatar",
  checkToken,
  upload("users").single("avatar"),
  uploadAvatar
);
router.put("/change-password", checkToken, changePassword);

export default router;
