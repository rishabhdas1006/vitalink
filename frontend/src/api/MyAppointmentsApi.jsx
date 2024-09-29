import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useGetMyAppointments = (date) => {
	const [appointments, setAppointments] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getMyAppointments = async () => {
			try {
				const token = localStorage.getItem("authToken");
				const response = await fetch(
					`${API_BASE_URL}/api/v1/appointment/my/${date}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				const result = await response.json();
				setAppointments(result);
				setLoading(false);
				// console.log(result);
			} catch (error) {
				console.log("Failed to get appointments", error);
				setLoading(false);
			}
		};

		getMyAppointments();
	}, [date]);

	return { appointments, loading };
};

const useBookAppointment = () => {
	const navigate = useNavigate();

	const bookAppointment = async (appointmentDetails) => {
		try {
			const token = localStorage.getItem("authToken");
			const response = await fetch(
				`${API_BASE_URL}/api/v1/appointment/`,
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						patient: appointmentDetails.patient,
						doctor: appointmentDetails.doctor,
						appointmentType: appointmentDetails.appointmentType,
						appointmentDate: appointmentDetails.appointmentDate,
						reason: appointmentDetails.reason,
					}),
				}
			);
			const result = await response.json();
			if (response.status === 201) {
				console.log("Appointment created: ", result);
				navigate(`/appointment/${result.appointment._id}`);
			} else {
				console.log("Failed to create appointment: ", response);
			}
		} catch (error) {
			console.log("Failed to create appointment:", error);
		}
	};

	return { bookAppointment };
};

const useGetMyAppointmentById = (appointmentId) => {
	const [appointment, setAppointment] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getMyAppointmentById = async () => {
			try {
				const token = localStorage.getItem("authToken");
				const response = await fetch(
					`${API_BASE_URL}/api/v1/appointment/${appointmentId}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				const result = await response.json();
				setAppointment(result);
				setLoading(false);
				// console.log(result);
			} catch (error) {
				console.log("Failed to get appointment", error);
				setLoading(false);
			}
		};

		getMyAppointmentById();
	}, [appointmentId]);

	return { appointment, loading };
};

export { useGetMyAppointments, useBookAppointment, useGetMyAppointmentById };
