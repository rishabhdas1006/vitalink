import { useAuth } from "../context/AuthContext";
import { useBookAppointment } from "../api/MyAppointmentsApi";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AppointmentBookingPage = () => {
	const { user } = useAuth();
	const { userId } = useParams();
	const { newAppointment, bookAppointment } = useBookAppointment();

	const [reason, setReason] = useState("");
	const [appointmentDate, setAppointmentDate] = useState(new Date());
	const [appointmentType, setAppointmentType] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(user);
		bookAppointment({
			patient: user._id,
			doctor: userId,
			reason,
			appointmentDate,
			appointmentType,
		});
		console.log(newAppointment);
	};

	return (
		<div className="flex justify-center items-center">
			<div className="max-w-5xl">
				<form
					className=" w-full p-4 rounded shadow-md"
					onSubmit={handleSubmit}
				>
					<h2 className="text-xl mb-4 font-lighter text-gray-900">
						Book appointment
					</h2>
					<p className="text-gray-600 mb-4">
						Required fields are marked *
					</p>

					<div className="grid grid-cols-1 md:grid-cols-6 gap-3">
						<div className="mb-4 md:col-span-2">
							<label htmlFor="name">
								Name
								<input
									type="text"
									id="name"
									name="name"
									className="w-full px-3 py-2 rounded-sm border border-gray-300 focus:outline-none border-solid cursor-not-allowed"
									placeholder="Name*"
									disabled
									value={user.name}
								/>
							</label>
						</div>
						<div className="mb-4 md:col-span-2">
							<label htmlFor="email">
								Email
								<input
									type="email"
									id="email"
									name="email"
									className="w-full px-3 py-2 rounded-sm border border-gray-300 focus:outline-none border-solid cursor-not-allowed"
									placeholder="Email*"
									disabled
									value={user.email}
								/>
							</label>
						</div>
						<div className="mb-4 md:col-span-2">
							<label htmlFor="phone">
								Phone
								<input
									type="text"
									id="phone"
									name="phone"
									className="w-full px-3 py-2 rounded-sm border border-gray-300 focus:outline-none border-solid cursor-not-allowed"
									placeholder="Phone"
									disabled
									value={user.phone}
								/>
							</label>
						</div>
						<div className="mb-4 md:col-span-3 border border-gray-300 p-2">
							<div>Preferred Appointment Date</div>
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
							<div>
								Appointment Type
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label
											htmlFor="appointmentType"
											className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-teal-500 has-[:checked]:ring-1 has-[:checked]:ring-teal-500"
										>
											<div>In-person</div>

											<input
												type="radio"
												name="appointmentType"
												value="offline"
												onClick={(e) =>
													setAppointmentType(
														e.target.value
													)
												}
												id="appointmentType"
												className="size-5 border-gray-300 text-teal-500"
												required
											/>
										</label>
									</div>

									<div>
										<label
											htmlFor="appointmentType"
											className="flex cursor-pointer justify-between gap-2 rounded-lg border border-gray-100 p-2 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-teal-500 has-[:checked]:ring-1 has-[:checked]:ring-teal-500"
										>
											<div>Telehealth/Video Call</div>

											<input
												type="radio"
												name="appointmentType"
												value="online"
												onClick={(e) =>
													setAppointmentType(
														e.target.value
													)
												}
												id="appointmentType"
												className="size-5 border-gray-300 text-teal-500"
												required
											/>
										</label>
									</div>
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
					<div className="flex flex-col md:flex-row justify-end gap-3">
						<Link
							to={`/dashboard`}
							className="py-2 px-6 border border-teal-700 text-teal-700 rounded-sm hover:bg-teal-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600"
						>
							Cancel
						</Link>
						<button
							type="submit"
							className="py-2 px-6 bg-teal-700 text-white rounded-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600"
						>
							Confirm appointment
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AppointmentBookingPage;
