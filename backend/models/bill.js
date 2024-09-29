import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
	patient: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Patient",
		required: true,
	},
	doctor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Doctor",
		required: true,
	},
	appointment: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Appointment",
		required: true,
	},
	totalAmount: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		enum: ["Pending", "Paid"],
		default: "Pending",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Bill = mongoose.model(Bill, billSchema);

export default Bill;
