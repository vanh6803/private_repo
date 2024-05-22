import express from "express";
import { administrativePrivilegesCheck, checkToken } from "../middleware/index";
import {
  createProduct,
  deleteProduct,
  getProductsByCategory,
  updateProduct,
} from "../controllers/Product";
import { upload } from "../config/ConfigStogare";
const router = express.Router();

router.get("/products-by-category", getProductsByCategory);

router.post(
  "/",
  checkToken,
  administrativePrivilegesCheck,
  upload("products").array("image", 6),
  createProduct
);
router.put("/:id", checkToken, administrativePrivilegesCheck, updateProduct);
router.delete("/:id", checkToken, administrativePrivilegesCheck, deleteProduct);

export default router;
