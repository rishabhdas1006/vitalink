import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useGetMyAppointments } from "../api/MyAppointmentsApi";
import TitleCard from "../components/TitleCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AppointmentsList from "../components/AppointmentsList";
import DashboardGreeting from "../components/DashboardGreeting";
import AppointmentBooking from "../components/AppointmentBooking";
import Loading from "../components/Loading";

const getSearchDate = (date) => {
	return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
		.toISOString()
		.split("T")[0];
};

const Dashboard = () => {
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	}, [user, navigate]);

	const [searchDate, setSearchDate] = useState(new Date(Date.now()));
	const { appointments, loading } = useGetMyAppointments(
		getSearchDate(searchDate)
	);

	useEffect(() => {
		console.log(appointments);
	}, [searchDate]);

	if (!user || loading) return <Loading />;

	return (
		<div className="lg:px-16">
			<DashboardGreeting />
			{user.role === "patient" && (
				<TitleCard title="Book an appointment" topMargin="mt-2">
					<AppointmentBooking />
				</TitleCard>
			)}
			<TitleCard
				title="Your appointments"
				topMargin="mt-2"
				TopSideButtons={
					<DatePicker
						className="text-center bg-gray-100 rounded-lg mx-1"
						selected={searchDate}
						onChange={(e) => setSearchDate(e)}
						closeOnScroll={true}
					/>
				}
			>
				{loading ? (
					<>Loading</>
				) : appointments.length ? (
					<AppointmentsList
						appointments={appointments}
						role={user.role}
					/>
				) : (
					<div className="w-full text-center text-2xl font-light">
						All done here!
					</div>
				)}
			</TitleCard>
		</div>
	);
};

export default Dashboard;
