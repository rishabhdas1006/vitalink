import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	specialization: {
		type: String,
		required: true,
	},
	qualification: {
		type: String,
		required: true,
	},
	yearsOfExperience: {
		type: Number,
		required: true,
	},
	bio: {
		type: String,
		// required: true,
	},
	availableHours: {
		startTime: {
			type: String,
			required: true,
		},
		endTime: {
			type: String,
			required: true,
		},
	},
	ratings: {
		type: [Number],
		default: [],
	},
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
