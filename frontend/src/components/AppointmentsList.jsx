import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { SquareArrowOutUpRight } from "lucide-react";
import AppointmentStatus from "./AppointmentStatus";

const AppointmentsList = ({ appointments, role }) => {
	const oppRole = role === "doctor" ? "patient" : "doctor";
	return (
		<div className="overflow-x-auto w-full rouned-lg shadow">
			<table className="w-full">
				<thead className="bg-gray-50 border-b-2 border-gray-200">
					<tr>
						<th className="p-3 text-sm font-semibold tracking-wide text-center">
							Date & Time
						</th>
						<th className="p-3 text-sm font-semibold tracking-wide text-center">
							{oppRole[0].toUpperCase() + oppRole.slice(1)}
						</th>
						<th className="p-3 text-sm font-semibold tracking-wide text-center">
							Status
						</th>
						<th className="p-3 text-sm font-semibold tracking-wide text-center">
							Details
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-100">
					{appointments?.map((l, k) => {
						return (
							<tr
								key={k}
								className={`text-center ${
									k % 2 == 0 ? "bg-white" : "bg-gray-50"
								}`}
							>
								<td className="p-3 text-sm text-gray-700 whitespace-nowrap">
									{dateFormat(
										l.appointmentDate,
										"dd/mm/yy hh:MM TT"
									)}
								</td>
								<td className="p-3 text-sm text-gray-700 whitespace-nowrap">
									{l[`${oppRole}`]["name"]}
								</td>
								<td className="p-3 text-sm text-gray-700 whitespace-nowrap">
									<span className="p-1.5 text-xs font-medium uppercase tracking-wider rounded-lg bg-opacity-50">
										<AppointmentStatus status={l.status}>
											{l.status}
										</AppointmentStatus>
									</span>
								</td>
								<td className="p-3 text-sm text-gray-700 whitespace-nowrap flex items-center justify-center">
									<Link
										className="text-blue-500 cursor-pointer"
										to={`/appointment/${l._id}`}
									>
										<SquareArrowOutUpRight size={16} />
									</Link>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default AppointmentsList;
