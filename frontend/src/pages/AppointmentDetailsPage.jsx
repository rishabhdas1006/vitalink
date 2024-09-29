import { useParams, Link } from "react-router-dom";
import { useGetMyAppointmentById } from "../api/MyAppointmentsApi";
import { Stethoscope } from "lucide-react";
import dateFormat from "dateformat";
import AppointmentStatus from "../components/AppointmentStatus";
import Button from "../components/Button";

const AppointmentDetailsPage = () => {
	const params = useParams();
	const { appointment, loading } = useGetMyAppointmentById(
		params.appointmentId
	);

	if (loading) return <p>Loading...</p>;

	return (
		<div className="flex justify-center items-center">
			<div className="mx-auto max-w-screen-lg">
				<div className="relative flex w-full max-w-screen-lg flex-col rounded-xl bg-transparent bg-clip-border shadow-md p-6">
					<div className="relative flex items-center gap-4 pt-0 pb-4 mx-0 mt-4 overflow-hidden bg-transparent shadow-none rounded-xl bg-clip-border">
						<Stethoscope size={120} strokeWidth={1.5} />
						<div className="flex w-full flex-col gap-0.5">
							<h5 className="block text-4xl antialiased font-bold">
								{appointment?.doctor.name}
							</h5>
							<p className="block text-2xl antialiased font-light">
								{appointment?.patient.name}
							</p>
						</div>
					</div>
					<div className="mb-3">
						<div>
							<div className="font-light pr-4 mt-4">
								Appointment Date & Time
							</div>
							<div className="font-bold text-2xl mt-2">
								{dateFormat(
									appointment?.appointmentDate,
									"dd/mm/yy hh:MM TT"
								)}
							</div>
						</div>
						<div>
							<div className="font-light pr-4 mt-4">
								Appointment Reason
							</div>
							<div className="font-bold text-lg mt-2">
								{appointment?.reason}
							</div>
						</div>
						<div>
							<div className="font-light pr-4 mt-4">
								Appointment Status
							</div>
							<div className="font-bold text-2xl mt-2">
								<AppointmentStatus status={appointment?.status}>
									{appointment?.status}
								</AppointmentStatus>
							</div>
						</div>

						<Link
							to={`/book/`}
							className="flex justify-center pt-6 mt-4"
						>
							<Button content={"Update Appointment"} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AppointmentDetailsPage;
