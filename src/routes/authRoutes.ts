import { Router } from "express";
import { adminDashboard, forgotPassword, login, logout, profile, refreshToken, register, resendOTP, resetPassword, verifyEmail } from "../controllers/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authorizedMiddleware.js";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/profile", authenticate, profile);
authRoutes.get("/admin", authenticate, authorize("ADMIN"), adminDashboard);
authRoutes.post("/refresh-token", refreshToken);
authRoutes.post("/logout", logout);
// authRoutes.post("/send-test-email", sendTestEmail);
authRoutes.post("/verify-email", verifyEmail);
authRoutes.post("/resend-otp", resendOTP);
authRoutes.post("/forgot-password",forgotPassword);
authRoutes.post("/reset-password", resetPassword);

export default authRoutes;