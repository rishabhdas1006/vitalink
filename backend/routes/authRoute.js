import express from "express";
import { authenticateJWT, checkPassword } from "../middleware/auth.js";
import {
	register,
	login,
	getProfile,
	getProfileDetail,
	updateProfile,
} from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticateJWT, getProfile);
router.get("/detail/:userId", authenticateJWT, getProfileDetail);
router.put("/update-profile", authenticateJWT, checkPassword, updateProfile);

export default router;
