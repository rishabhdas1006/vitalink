import { useAuth } from "../context/AuthContext";

const qoute =
	"The doctor of the future will give no medicine, but will interest her or his patients in the care of the human frame, in a proper diet, and in the cause and prevention of disease.";
const author = "Thomas Edison";

const DashboardGreeting = () => {
	const { user } = useAuth();
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
					<p>Qoute!</p>
				</div>
				<div className="italic">{qoute}</div>
				<div className="w-full text-right font-semibold">
					{" "}
					- {author}
				</div>
			</div>
		</div>
	);
};

export default DashboardGreeting;
