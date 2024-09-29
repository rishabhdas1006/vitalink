import { Hospital } from "lucide-react";
import LiveSearch from "./LiveSearch";

const AppointmentBooking = () => {
	return (
		<div className="h-[200px] flex flex-col justify-between items-center">
			<LiveSearch renderItem={(item) => <p>{item.name}</p>} />
			<Hospital size={132} strokeWidth={1} className="text-teal-300" />
		</div>
	);
};

export default AppointmentBooking;
