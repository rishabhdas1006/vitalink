import Doctor from "../models/doctor.js";
import User from "../models/user.js";

const GetAllDoctor = async (req, res) => {
	try {
		const { query } = req.params;

		const doctors =
			query !== ""
				? await User.find({
						$and: [
							{ role: "doctor" },
							{ name: { $regex: query, $options: "i" } },
						],
				  })
				: [];
		res.status(200).json(doctors);
	} catch (error) {
		console.error("Error fetching doctors:", error);
		res.status(500).json({
			message: "Failed to fetch doctors",
			error: error.message,
		});
	}
};
const GetDoctorById = async (req, res) => {
	try {
		const { id } = req.params;
		const doctor = await Doctor.findById(id);

		if (!doctor) {
			return res.status(404).json({ message: "Doctor not found" });
		}

		res.status(200).json({ roleData: doctor });
	} catch (error) {
		console.error("Error fetching doctor by ID:", error);
		res.status(500).json({
			message: "Failed to fetch doctor",
			error: error.message,
		});
	}
};
const CreateDoctor = async (req, res) => {
	try {
		const id = req.user._id;

		const {
			specialization,
			qualification,
			yearsOfExperience,
			bio,
			availableHours,
		} = req.body.roleData;

		const existingDoctor = await Doctor.findOne({ user: id });
		if (existingDoctor) {
			return res.status(400).json({ message: "Doctor already exists" });
		}

		const existingUser = await User.findById(id);
		if (!existingUser) {
			return res
				.status(400)
				.json({ message: "No such user, first create an account" });
		}

		const newDoctor = new Doctor({
			user: id,
			specialization,
			qualification,
			yearsOfExperience,
			bio,
			availableHours,
		});
		await newDoctor.save();

		existingUser.roleRefId = newDoctor._id;
		await existingUser.save();

		res.status(201).json({
			message: "Doctor created successfully",
			roleData: newDoctor,
		});
	} catch (error) {
		console.error("Error creating doctor:", error);
		res.status(500).json({
			message: "Failed to create doctor",
			error: error.message,
		});
	}
};
const UpdateDoctor = async (req, res) => {
	try {
		const { id } = req.params;

		const existingDoctor = await Doctor.findById(id);
		if (!existingDoctor) {
			return res.status(400).json({ message: "No such Doctor" });
		}
		const {
			specialization,
			qualification,
			yearsOfExperience,
			bio,
			availableHours,
		} = req.body.roleData;

		existingDoctor.specialization = specialization;
		existingDoctor.qualification = qualification;
		existingDoctor.yearsOfExperience = yearsOfExperience;
		existingDoctor.bio = bio;
		existingDoctor.availableHours = availableHours;

		await existingDoctor.save();

		res.status(200).json({
			message: "Doctor updated successfully",
			roleData: existingDoctor,
		});
	} catch (error) {
		console.error("Error updating doctor:", error);
		res.status(500).json({
			message: "Failed to update doctor",
			error: error.message,
		});
	}
};
const DeleteDoctor = async (req, res) => {
	try {
		const { id } = req.params;

		const doctor = await Doctor.findById(id);
		if (!doctor) {
			return res.status(404).json({ message: "Doctor not found" });
		}

		await doctor.deleteOne();
		res.status(200).json({ message: "Doctor deleted successfully" });
	} catch (error) {
		console.error("Error deleting doctor:", error);
		res.status(500).json({
			message: "Failed to delete doctor",
			error: error.message,
		});
	}
};

export {
	GetAllDoctor,
	GetDoctorById,
	CreateDoctor,
	UpdateDoctor,
	DeleteDoctor,
};
