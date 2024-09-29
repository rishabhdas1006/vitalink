import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	salt: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["patient", "doctor", "admin"],
		required: true,
	},
	roleRefId: {
		type: mongoose.Schema.Types.ObjectId,
		required: false,
		default: null
	},
	phone: {
		type: String,
		required: false,
	},
	address: {
		type: String,
		required: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model("User", userSchema);

export default User;
