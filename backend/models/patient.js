import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	medicalHistory: {
		type: String,
		required: true,
	},
	allergies: {
		type: String,
		required: false,
	},
	medications: {
		type: String,
		required: false,
	},
	insuranceDetails: {
		type: String,
		required: false,
	},
});

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
