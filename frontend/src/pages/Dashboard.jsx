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

const getSearchDate = (date) => {
	return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
		.toISOString()
		.split("T")[0];
};

const Dashboard = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user } = useSelector((state) => state.auth);
	const { list: appointments, status } = useSelector(
		(state) => state.appointment
	);

	const [searchDate, setSearchDate] = useState(new Date());

	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	}, [user, navigate]);

	useEffect(() => {
		if (user) {
			dispatch(fetchMyAppointments(getSearchDate(searchDate)));
		}
	}, [dispatch, user, searchDate]);

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
