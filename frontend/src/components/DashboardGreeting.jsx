import { useSelector } from "react-redux";

const quote = // I've corrected the variable name from "qoute" to "quote"
	"The doctor of the future will give no medicine, but will interest her or his patients in the care of the human frame, in a proper diet, and in the cause and prevention of disease.";
const author = "Thomas Edison";

const DashboardGreeting = () => {
	// Get the user object from the Redux store
	const { user } = useSelector((state) => state.auth);

	// Don't render the component if there's no user data yet
	if (!user) {
		return null;
	}

	return (
		<div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-3">
			<div className="rounded-sm border p-6">
				<h4 className="font-light">
					<p>Hello, {user.name}!</p>
				</h4>
				<div className="text-2xl">
					<h1>Welcome to your Dashboard</h1>
				</div>
			</div>
			<div className="rounded-sm border p-6 md:col-span-2">
				<div className="font-bold">
					<p>Quote!</p>
				</div>
				<div className="italic">{quote}</div>
				<div className="w-full text-right font-semibold">
					{" "}
					- {author}
				</div>
			</div>
		</div>
	);
};

export default DashboardGreeting;
