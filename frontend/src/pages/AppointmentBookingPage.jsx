import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bookNewAppointment } from "../features/appointment/appointmentSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loading from "../components/Loading";

const AppointmentBookingPage = () => {
	const { userId: doctorId } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user } = useSelector((state) => state.auth);
	const { status, error } = useSelector((state) => state.appointment);

	const [reason, setReason] = useState("");
	const [appointmentDate, setAppointmentDate] = useState(new Date());
	const [appointmentType, setAppointmentType] = useState("");

	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	}, [user, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const appointmentData = {
			patient: user._id,
			doctor: doctorId,
			reason,
			appointmentDate,
			appointmentType,
		};

		try {
			const newAppointment = await dispatch(
				bookNewAppointment(appointmentData)
			).unwrap();
			navigate(`/appointment/${newAppointment._id}`);
		} catch (err) {
			console.error("Failed to book appointment:", err);
		}
	};

	if (!user) {
		return <Loading />;
	}

	return (
		<div className="flex justify-center items-center">
			<div className="max-w-5xl w-full">
				<form
					className="w-full p-4 rounded shadow-md"
					onSubmit={handleSubmit}
				>
					<h2 className="text-xl mb-4 font-lighter text-gray-900">
						Book Appointment
					</h2>
					<p className="text-gray-600 mb-4">
						Required fields are marked *
					</p>

					<div className="grid grid-cols-1 md:grid-cols-6 gap-3">
						<div className="mb-4 md:col-span-2">
							<label>Name</label>
							<input
								type="text"
								disabled
								value={user.name}
								className="w-full px-3 py-2 rounded-sm border border-gray-300 cursor-not-allowed"
							/>
						</div>
						<div className="mb-4 md:col-span-2">
							<label>Email</label>
							<input
								type="email"
								disabled
								value={user.email}
								className="w-full px-3 py-2 rounded-sm border border-gray-300 cursor-not-allowed"
							/>
						</div>
						<div className="mb-4 md:col-span-2">
							<label>Phone</label>
							<input
								type="text"
								disabled
								value={user.phone}
								className="w-full px-3 py-2 rounded-sm border border-gray-300 cursor-not-allowed"
							/>
						</div>

						<div className="mb-4 md:col-span-3 border border-gray-300 p-2">
							<div>Preferred Appointment Date*</div>
							<DatePicker
								selected={appointmentDate}
								onChange={(date) => setAppointmentDate(date)}
								className="w-full"
								showTimeSelect
								timeFormat="p"
								timeIntervals={15}
								dateFormat="Pp"
							/>
						</div>

						<div className="mb-4 md:col-span-3 border border-gray-300 p-2">
							<div>Appointment Type*</div>
							<div className="grid grid-cols-2 gap-4 mt-2">
								<div>
									<label className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm has-[:checked]:border-teal-500">
										<span>In-person</span>
										<input
											type="radio"
											name="appointmentType"
											value="offline"
											onChange={(e) =>
												setAppointmentType(
													e.target.value
												)
											}
											required
											className="size-5 border-gray-300 text-teal-500"
										/>
									</label>
								</div>
								<div>
									<label className="flex cursor-pointer justify-between gap-2 rounded-lg border border-gray-100 p-2 text-sm font-medium shadow-sm has-[:checked]:border-teal-500">
										<span>Video Call</span>
										<input
											type="radio"
											name="appointmentType"
											value="online"
											onChange={(e) =>
												setAppointmentType(
													e.target.value
												)
											}
											required
											className="size-5 border-gray-300 text-teal-500"
										/>
									</label>
								</div>
							</div>
						</div>

						<div className="mb-4 col-span-1 md:col-span-6">
							<textarea
								id="comment"
								name="comment"
								className="w-full px-3 py-2 rounded-sm border border-gray-300 focus:outline-none border-solid focus:border-dashed resize-none"
								placeholder="Enter reason *"
								rows="5"
								required
								onChange={(e) => setReason(e.target.value)}
							></textarea>
						</div>
					</div>

					{status === "failed" && error && (
						<p className="text-center text-sm font-medium text-red-500 my-2">
							{error.message ||
								"Booking failed. Please try again."}
						</p>
					)}

					<div className="flex flex-col md:flex-row justify-end gap-3 mt-4">
						<Link
							to={`/dashboard`}
							className="text-center py-2 px-6 border border-teal-700 text-teal-700 rounded-sm hover:bg-teal-600 hover:text-white"
						>
							Cancel
						</Link>
						<button
							type="submit"
							disabled={status === "loading"}
							className="py-2 px-6 bg-teal-700 text-white rounded-sm hover:bg-teal-600 disabled:bg-teal-300"
						>
							{status === "loading"
								? "Confirming..."
								: "Confirm Appointment"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AppointmentBookingPage;
