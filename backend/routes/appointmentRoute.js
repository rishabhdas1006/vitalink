import express from "express";
import {
	GetAllAppointment,
	GetMyAppointment,
	GetAppointmentById,
	CreateAppointment,
	UpdateAppointmentById,
} from "../controllers/AppointmentController.js";
import { authenticateJWT, checkPassword } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticateJWT, GetAllAppointment);
router.get("/my/:date", authenticateJWT, GetMyAppointment);
router.get("/:id", authenticateJWT, GetAppointmentById);
router.post("/", authenticateJWT, CreateAppointment);
router.put("/:id", authenticateJWT, checkPassword, UpdateAppointmentById);

export default router;
