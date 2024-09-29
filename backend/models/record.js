import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
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
	diagnosis: {
		type: String,
		required: true,
	},
	prescriptions: [
		{
			name: { type: String },
			dosage: { type: String },
		},
	],
	notes: { type: String },
	date: {
		type: Date,
		default: Date.now,
	},
});

const Record = mongoose.model(Record, recordSchema);

export default Record;
