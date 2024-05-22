import express from "express";
import { checkToken } from "../middleware/index";
import {
  addToCart,
  getAllCart,
  removeFromCart,
  updateCart,
} from "../controllers/Cart";
const router = express.Router();

router.get("/", checkToken, getAllCart);
router.post("/", checkToken, addToCart);
router.put("/:id", checkToken, updateCart);
router.delete("/:id", checkToken, removeFromCart);

export default router;
