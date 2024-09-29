import express from "express";
import { authenticateJWT, checkPassword } from "../middleware/auth.js";
import {
	GetAllDoctor,
	GetDoctorById,
	CreateDoctor,
	UpdateDoctor,
	DeleteDoctor,
} from "../controllers/DoctorController.js";

const router = express.Router();

router.get("/all/:query", authenticateJWT, GetAllDoctor);
router.get("/:id", authenticateJWT, GetDoctorById);
router.post("/", authenticateJWT, CreateDoctor);
router.put("/:id", authenticateJWT, checkPassword, UpdateDoctor);
router.delete("/:id", authenticateJWT, checkPassword, DeleteDoctor);

export default router;
