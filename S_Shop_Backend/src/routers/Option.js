import express from "express";
import { administrativePrivilegesCheck, checkToken } from "../middleware/index";
import {
  createOption,
  deleteOption,
  getOption,
  updateOption,
} from "../controllers/Option";
import multer from "multer";
import { createStorage } from "../utils/CloudinaryService";
import { upload } from "../config/ConfigStogare";
const router = express.Router();

// const upload = multer({ storage: createStorage("user", "png") });
router.get("/:idProduct", getOption);
router.post(
  "/",
  checkToken,
  administrativePrivilegesCheck,
  upload("options").single("image"),
  createOption
);
router.put(
  "/:id",
  checkToken,
  administrativePrivilegesCheck,
  upload("options").single("image"),
  updateOption
);
router.delete("/:id", checkToken, administrativePrivilegesCheck, deleteOption);

export default router;
