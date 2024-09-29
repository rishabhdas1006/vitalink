import bg from "../assets/landing-img-1.jpg";
import Button from "../components/Button";
import ButtonOutline from "../components/ButtonOutline";
import { Link } from "react-router-dom";

const LandingPage = () => {
	return (
		<section>
			<div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
					<div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-full">
						<img
							alt=""
							src={bg}
							className="absolute inset-0 h-full w-full object-cover"
						/>
					</div>

					<div className="lg:py-24">
						<h2 className="text-3xl font-bold sm:text-4xl">
							Get started
						</h2>

						<p className="mt-4 text-gray-600">
							Securely access your personalized healthcare
							dashboard and manage appointments with just a few
							clicks.
						</p>

						<div className="grid grid-cols-2 py-8 text-center">
							<div className="flex flex-col items-center px-2 py-4 gap-4">
								<span className="font-bold">
									Access your schedule, manage appointments,
									and provide expert care.
								</span>
								<Link to="/register">
									<Button content={"Register"} />
								</Link>
							</div>
							<div className="flex flex-col items-center px-2 py-4 gap-4">
								<span className="font-bold">
									Book appointments, consult with doctors, and
									track your health effortlessly.
								</span>

								<Link to="/login">
									<ButtonOutline content={"Login"} />
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LandingPage;
