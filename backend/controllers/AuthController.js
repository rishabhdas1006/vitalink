import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import User from "../models/user.js";
import Doctor from "../models/doctor.js";
import Patient from "../models/patient.js";

const generateSalt = () => {
	return CryptoJS.lib.WordArray.random(128 / 8).toString();
};

const register = async (req, res) => {
	try {
		const { name, email, password, role, phone, address } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "User already registered" });
		}

		const salt = generateSalt(password);
		const hashedPassword = CryptoJS.SHA256(password + salt).toString();

		const newUser = new User({
			name,
			email,
			password: hashedPassword,
			salt,
			role,
			phone,
			address,
		});

		await newUser.save();

		const token = jwt.sign(
			{ userId: newUser._id, role: newUser.role },
			process.env.JWT_SECRET,
			{
				expiresIn: "2d",
			}
		);

		res.status(201).json({
			message: "User registered successfully",
			token,
			user: {
				name: newUser.name,
				email: newUser.email,
				role: newUser.role,
				phone: newUser.phone,
				address: newUser.address,
				_id: newUser._id,
			},
		});
	} catch (error) {
		console.error("Error in user registration:", error);

		res.status(500).json({
			message: "Registration failed",
			error: error.message,
		});
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const hashedPassword = CryptoJS.SHA256(password + user.salt).toString();

		if (hashedPassword !== user.password) {
			return res.status(401).json({ message: "Incorrect password" });
		}

		const token = jwt.sign(
			{ userId: user._id, role: user.role },
			process.env.JWT_SECRET,
			{
				expiresIn: "2d",
			}
		);

		res.status(200).json({
			message: "Login successful",
			token,
			user: {
				_id: user._id,
				name: user.name,
				email: user.email,
				roleRefId: user.roleRefId,
				role: user.role,
				phone: user.phone,
				address: user.address,
			},
		});
	} catch (error) {
		console.error("Error in user login:", error);
		res.status(500).json({ message: "Login failed", error: error.message });
	}
};

const getProfile = async (req, res) => {
	try {
		const user = req.user;

		res.status(200).json({
			user: {
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
				phone: user.phone,
				address: user.address,
			},
		});
	} catch (error) {
		console.error("Error in getting user:", error);
		res.status(500).json({
			message: "Get user failed",
			error: error.message,
		});
	}
};

const getAvg = (ratings) => {
	if (ratings.length === 0) return 0;
	const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
	return avg.toFixed(2);
};

const getProfileDetail = async (req, res) => {
	try {
		const { userId } = req.params;

		const user = await User.findById(userId);

		if (!user) res.status(404).json({ message: "No such user" });

		let roleDetail =
			user.role === "doctor"
				? await Doctor.findById(user.roleRefId)
				: await Patient.findById(user.roleRefId);

		let ratingDetail = {};

		if (user.role === "doctor") {
			const ratings = roleDetail.ratings;
			ratingDetail.cnt = ratings.length;
			ratingDetail.avg = getAvg(ratings);
		}

		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			roleRefId: user.roleRefId,
			phone: user.phone,
			address: user.address,
			roleDetail,
			ratingDetail,
		});
	} catch (error) {
		console.error("Error in getting user:", error);
		res.status(500).json({
			message: "Get user failed",
			error: error.message,
		});
	}
};

const updateProfile = async (req, res) => {
	try {
		const userId = req.user._id;
		const user = req.user;
		const { name, email, password, newPassword, phone, address } = req.body;

		if (email && email !== user.email) {
			const emailExists = await User.findOne({ email });
			if (emailExists) {
				return res
					.status(400)
					.json({ message: "Email is already in use" });
			}
			user.email = email;
		}

		if (name) user.name = name;
		if (phone) user.phone = phone;
		if (address) user.address = address;

		if (newPassword) {
			const salt = generateSalt(newPassword);
			const hashedPassword = CryptoJS.SHA256(
				newPassword + salt
			).toString();

			user.password = hashedPassword;
			user.salt = salt;
		}

		await user.save();

		res.status(200).json({
			message: "User updated successfully",
			user: {
				name: user.name,
				email: user.email,
				role: user.role,
				phone: user.phone,
				address: user.address,
			},
		});
	} catch (error) {
		console.error("Error updating user:", error);
		res.status(500).json({
			message: "Failed to update user",
			error: error.message,
		});
	}
};

export { register, login, getProfile, getProfileDetail, updateProfile };
