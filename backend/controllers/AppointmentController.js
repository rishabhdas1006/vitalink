import Appointment from "../models/appointment.js";
import User from "../models/user.js";
import Doctor from "../models/doctor.js";
import Patient from "../models/patient.js";

const GetAllAppointment = async (req, res) => {
	try {
		const appointments = await Appointment.find();
		res.status(200).json(appointments);
	} catch (error) {
		console.error("Error fetching appointments:", error);
		res.status(500).json({
			message: "Failed to fetch appointments",
			error: error.message,
		});
	}
};

const GetMyAppointment = async (req, res) => {
	try {
		const id = req.user._id;
		const role = req.user.role;
		const { date } = req.params;
		const reqDate = new Date(date);
		const nextDate = new Date(reqDate.getTime() + 24 * 60 * 60 * 1000);

		if (role === "doctor") {
			const doctor = await Doctor.findOne({ user: id });

			if (!doctor) {
				return res.status(404).json({ message: "No such user" });
			}

			const appointments = await Appointment.find({
				$and: [
					{ "doctor.id": `${doctor._id}` },
					{
						appointmentDate: {
							$gte: reqDate,
						},
					},
					{
						appointmentDate: {
							$lt: nextDate,
						},
					},
				],
			});

			if (!appointments) {
				return res
					.status(404)
					.json({ message: "No Appointments not found" });
			}

			res.status(200).json(appointments);
		} else {
			const patient = await Patient.findOne({ user: id });

			if (!patient) {
				return res.status(404).json({ message: "No such user" });
			}

			const appointments = await Appointment.find({
				$and: [
					{ "patient.id": `${patient._id}` },
					{
						appointmentDate: {
							$gte: reqDate,
						},
					},
					{
						appointmentDate: {
							$lt: nextDate,
						},
					},
				],
			});

			if (!appointments) {
				return res
					.status(404)
					.json({ message: "No Appointments not found" });
			}

			res.status(200).json(appointments);
		}
	} catch (error) {
		console.error("Error fetching your appointments:", error);
		res.status(500).json({
			message: "Failed to fetch appointments",
			error: error.message,
		});
	}
};

const GetAppointmentById = async (req, res) => {
	try {
		const { id } = req.params;
		const appointment = await Appointment.findById(id);

		if (!appointment) {
			return res.status(404).json({ message: "Appointment not found" });
		}

		res.status(200).json(appointment);
	} catch (error) {
		console.error("Error fetching appointment by ID:", error);
		res.status(500).json({
			message: "Failed to fetch appointment",
			error: error.message,
		});
	}
};
const CreateAppointment = async (req, res) => {
	try {
		const id = req.user._id;
		const { patient, doctor, appointmentDate, appointmentType, reason } =
			req.body;

		const existingUser = await User.findById(id);
		if (!existingUser) {
			return res
				.status(400)
				.json({ message: "No such user, first create an account" });
		}

		const checkPatientExist = await User.findById(patient);
		const checkDoctorExist = await User.findById(doctor);

		if (!checkPatientExist || !checkDoctorExist) {
			return res
				.status(400)
				.json({ message: "No such patient or doctor" });
		}

		const newAppointment = new Appointment({
			patient: {
				id: checkPatientExist.roleRefId,
				name: checkPatientExist.name,
			},
			doctor: {
				id: checkDoctorExist.roleRefId,
				name: checkDoctorExist.name,
			},
			appointmentDate,
			appointmentType,
			reason,
		});

		await newAppointment.save();
		res.status(201).json({
			message: "Appointment created successfully",
			appointment: newAppointment,
		});
	} catch (error) {
		console.error("Error creating appointment:", error);
		res.status(500).json({
			message: "Failed to create appointment",
			error: error.message,
		});
	}
};
const UpdateAppointmentById = async (req, res) => {
	try {
		const { id } = req.params;
		const { appointmentDate, reason, status } = req.body;

		const existingAppointment = await Appointment.findById(id);

		if (!existingAppointment) {
			return res.status(400).json({ message: "No such appointment" });
		}

		existingAppointment.appointmentDate = appointmentDate;
		existingAppointment.reason = reason;
		existingAppointment.status = status;

		await existingAppointment.save();
		res.status(201).json({
			message: "Appointment updated successfully",
			doctor: existingAppointment,
		});
	} catch (error) {
		console.error("Error updating appointment:", error);
		res.status(500).json({
			message: "Failed to update appointment",
			error: error.message,
		});
	}
};

export {
	GetAllAppointment,
	GetMyAppointment,
	GetAppointmentById,
	CreateAppointment,
	UpdateAppointmentById,
};
