import User from "../models/user.js";
import Patient from "../models/patient.js";

const GetAllPatient = async (req, res) => {
	try {
		const patients = await Patient.find();
		res.status(200).json(patients);
	} catch (error) {
		console.error("Error fetching patients:", error);
		res.status(500).json({
			message: "Failed to fetch patients",
			error: error.message,
		});
	}
};
const GetPatientById = async (req, res) => {
	try {
		const { id } = req.params;
		const patient = await Patient.findById(id);

		if (!patient) {
			return res.status(404).json({ message: "Patient not found" });
		}

		res.status(200).json({ roleData: patient });
	} catch (error) {
		console.error("Error fetching patient by ID:", error);
		res.status(500).json({
			message: "Failed to fetch patient",
			error: error.message,
		});
	}
};
const CreatePatient = async (req, res) => {
	try {
		const id = req.user._id;

		const { medicalHistory, allergies, medications, insuranceDetails } =
			req.body.roleData;

		const existingPatient = await Patient.findOne({ user: id });
		if (existingPatient) {
			return res.status(400).json({ message: "Patient already exists" });
		}

		const existingUser = await User.findById(id);
		if (!existingUser) {
			return res
				.status(400)
				.json({ message: "No such user, first create an account" });
		}

		const newPatient = new Patient({
			user: id,
			medicalHistory,
			allergies,
			medications,
			insuranceDetails,
		});

		await newPatient.save();

		existingUser.roleRefId = newPatient._id;
		await existingUser.save();

		res.status(201).json({
			message: "Patient created successfully",
			roleData: newPatient,
		});
	} catch (error) {
		console.error("Error creating patient:", error);
		res.status(500).json({
			message: "Failed to create patient",
			error: error.message,
		});
	}
};
const UpdatePatientById = async (req, res) => {
	try {
		const { id } = req.params;

		const existingPatient = await Patient.findById(id);
		if (!existingPatient) {
			return res.status(400).json({ message: "No such Patient" });
		}
		const { medicalHistory, allergies, medications, insuranceDetails } =
			req.body.roleData;

		existingPatient.medicalHistory = medicalHistory;
		existingPatient.allergies = allergies;
		existingPatient.medications = medications;
		existingPatient.insuranceDetails = insuranceDetails;

		await existingPatient.save();

		res.status(200).json({
			message: "Patient updated successfully",
			roleData: existingPatient,
		});
	} catch (error) {
		console.error("Error updating patient:", error);
		res.status(500).json({
			message: "Failed to update patient",
			error: error.message,
		});
	}
};
const DeletePatientById = async (req, res) => {
	try {
		const { id } = req.params;

		const patient = await Patient.findById(id);
		if (!patient) {
			return res.status(404).json({ message: "Patient not found" });
		}

		await patient.deleteOne();
		res.status(200).json({ message: "Patient deleted successfully" });
	} catch (error) {
		console.error("Error deleting patient:", error);
		res.status(500).json({
			message: "Failed to delete patient",
			error: error.message,
		});
	}
};

export {
	GetAllPatient,
	GetPatientById,
	CreatePatient,
	UpdatePatientById,
	DeletePatientById,
};
