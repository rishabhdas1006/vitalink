import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import User from "../models/user.js";

const authenticateJWT = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		if (!authorization || !authorization.startsWith("Bearer ")) {
			return res
				.status(401)
				.json({ message: "Authorization header missing or malformed" });
		}

		const token = authorization.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		if (!decoded) {
			return res.status(401).json({ message: "Invalid token" });
		}

		const user = await User.findById(decoded.userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		req.user = user;
		next();
	} catch (error) {
		console.error("Error in JWT authentication:", error);
		return res
			.status(500)
			.json({ message: "Authentication failed", error: error.message });
	}
};

const checkPassword = async (req, res, next) => {
	try {
		const { password } = req.body;
		if (!password) {
			return res.status(400).json({ message: "Password is required" });
		}

		const user = req.user;

		if (!user.salt) {
			return res.status(500).json({ message: "User has no salt stored" });
		}

		const hashedPassword = CryptoJS.SHA256(password + user.salt).toString();

		if (hashedPassword !== user.password) {
			return res.status(401).json({ message: "Incorrect password" });
		}

		next();
	} catch (error) {
		console.error("Error in password check:", error);
		return res.status(500).json({
			message: "Password validation failed",
			error: error.message,
		});
	}
};

export { authenticateJWT, checkPassword };
