import express from "express";
import { checkToken } from "../middleware/index";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/Category";
const router = express.Router();

router.get("/", getCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
