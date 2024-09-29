import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
	doctor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Doctor",
		required: true,
	},
	patient: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Patient",
		required: true,
	},
	rating: {
		type: Number,
		required: true,
		min: 1,
		max: 5,
	},
	comments: { type: String },
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Feedback = mongoose.model(Feedback, feedbackSchema);

export default Feedback;
