import express from "express";
import { checkToken } from "../middleware/index";
import {
  forgotPassword,
  login,
  loginWithGoogle,
  logout,
  register,
  resendConfirmationCode,
  verifyEmail,
} from "../controllers/Auth";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/login-with-google", loginWithGoogle);
router.get("/logout", checkToken, logout)
router.get("/verify/:code", verifyEmail);
router.post("/resend-code", resendConfirmationCode);
router.post("/forgot-password", forgotPassword);

export default router;
