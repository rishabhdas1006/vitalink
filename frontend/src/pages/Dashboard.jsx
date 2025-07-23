import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMyAppointments } from "../features/appointment/appointmentSlice";
import TitleCard from "../components/TitleCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AppointmentsList from "../components/AppointmentsList";
import DashboardGreeting from "../components/DashboardGreeting";
import AppointmentBooking from "../components/AppointmentBooking";
import Loading from "../components/Loading";

// This helper function can remain as is
const getSearchDate = (date) => {
	return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
		.toISOString()
		.split("T")[0];
};

const Dashboard = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Select state from the Redux store
	const { user } = useSelector((state) => state.auth);
	const { list: appointments, status } = useSelector(
		(state) => state.appointment
	);

	// This local state for the date picker remains the same
	const [searchDate, setSearchDate] = useState(new Date());

	// Effect to redirect if not logged in
	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	}, [user, navigate]);

	// Effect to fetch appointments when the date changes
	useEffect(() => {
		// Only fetch if we have a logged-in user
		if (user) {
			dispatch(fetchMyAppointments(getSearchDate(searchDate)));
		}
	}, [dispatch, user, searchDate]);

	// The main loading check is simpler, just for the user object
	if (!user) {
		return <Loading />;
	}

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
						onChange={(date) => setSearchDate(date)}
						closeOnScroll={true}
					/>
				}
			>
				{/* Handle loading state specifically for the appointment list */}
				{status === "loading" ? (
					<Loading />
				) : appointments.length > 0 ? (
					<AppointmentsList
						appointments={appointments}
						role={user.role}
					/>
				) : (
					<div className="w-full text-center text-2xl font-light">
						All done here! No appointments for this date.
					</div>
				)}
			</TitleCard>
		</div>
	);
};

export default Dashboard;
