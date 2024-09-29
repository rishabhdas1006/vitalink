import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
	patient: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Patient",
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
	},
	doctor: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Doctor",
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
	},
	appointmentDate: {
		type: Date,
		required: true,
	},
	reason: {
		type: String,
		required: true,
	},
	appointmentType: {
		type: String,
		enum: ["offline", "online"],
		required: true,
	},
	status: {
		type: String,
		enum: ["Scheduled", "Completed", "Cancelled"],
		default: "Scheduled",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
