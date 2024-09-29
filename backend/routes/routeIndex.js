import express from "express";
import AuthRouter from "./authRoute.js";
import PatientRouter from "./patientRoute.js";
import DoctorRouter from "./doctorRoute.js";
import AppointmentRouter from "./appointmentRoute.js";

const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/patient", PatientRouter);
router.use("/doctor", DoctorRouter);
router.use("/appointment", AppointmentRouter);
// router.use("/record", RecordRouter);
// router.use("/bill", BillRouter);
// router.use("/feedback", FeedbackRouter);

export default router;
