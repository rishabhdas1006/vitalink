const AppointmentStatus = ({ children, status }) => {
	if (status === "Completed") {
		return (
			<span className="text-green-800 bg-green-200 px-1 rounded-md">
				{children}
			</span>
		);
	} else if (status === "Scheduled") {
		return (
			<span className="text-yellow-800 bg-yellow-200 px-1 rounded-md">
				{children}
			</span>
		);
	} else {
		return (
			<span className="text-gray-800 bg-gray-200 px-1 rounded-md">
				{children}
			</span>
		);
	}
};

export default AppointmentStatus;
