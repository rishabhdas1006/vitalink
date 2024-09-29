import express from "express";
import { authenticateJWT, checkPassword } from "../middleware/auth.js";
import {
	GetAllPatient,
	GetPatientById,
	CreatePatient,
	UpdatePatientById,
	DeletePatientById,
} from "../controllers/PatientController.js";

const router = express.Router();

router.get("/", authenticateJWT, GetAllPatient);
router.get("/:id", authenticateJWT, GetPatientById);
router.post("/", authenticateJWT, CreatePatient);
router.put("/:id", authenticateJWT, checkPassword, UpdatePatientById);
router.delete("/:id", authenticateJWT, checkPassword, DeletePatientById);

export default router;
