import { useAuth } from "../context/AuthContext.jsx";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import background from "../assets/login-bg.jpg";

const RegisterRage = () => {
	const { user, register } = useAuth();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [role, setRole] = useState("patient");
	const [password, setPassword] = useState("");
	const [passwordVisible, setPasswordVisible] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate("/dashboard");
		}
	}, [user, navigate]);

	const changePasswordVisibility = (e) => {
		setPasswordVisible(!passwordVisible);
	};

	const handleRegister = (e) => {
		e.preventDefault();
		register(name, email, phone, address, role, password);
	};

	return (
		<div className="flex flex-wrap lg:h-screen lg:items-center">
			<div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-12">
				<div className="mx-auto max-w-lg text-center">
					<h1 className="text-2xl font-bold sm:text-3xl">
						Join Us Today! Create Your Account
					</h1>

					<p className="mt-4 text-gray-500">
						Sign up to experience hassle-free healthcare services,
						book appointments, and receive expert care tailored to
						your needs.
					</p>
				</div>

				<form
					className="mx-auto mb-0 mt-8 max-w-md space-y-4"
					onSubmit={handleRegister}
				>
					<div>
						<label htmlFor="name" className="sr-only">
							Name
						</label>

						<div className="">
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
								placeholder="Enter name"
								required
							/>
						</div>
					</div>

					<div>
						<label htmlFor="email" className="sr-only">
							Email
						</label>

						<div className="relative">
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
								placeholder="Enter email"
								required
							/>
						</div>
					</div>
					<div>
						<label htmlFor="phone" className="sr-only">
							Phone
						</label>

						<div className="relative">
							<input
								type="text"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
								placeholder="Enter phone"
							/>
						</div>
					</div>

					<div>
						<label htmlFor="address" className="sr-only">
							Address
						</label>

						<div className="relative">
							<input
								type="text"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
								placeholder="Enter address"
							/>
						</div>
					</div>

					<div>
						<fieldset className="grid grid-cols-2 gap-4">
							<legend className="sr-only">Role</legend>

							<div>
								<label
									htmlFor="Patient"
									className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-teal-500 has-[:checked]:ring-1 has-[:checked]:ring-teal-500"
								>
									<div>
										<p className="text-gray-800">Patient</p>
									</div>

									<input
										type="radio"
										name="Role"
										value="patient"
										onClick={(e) => setRole(e.target.value)}
										id="Patient"
										className="size-5 border-gray-300 text-teal-500"
									/>
								</label>
							</div>

							<div>
								<label
									htmlFor="Doctor"
									className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-teal-500 has-[:checked]:ring-1 has-[:checked]:ring-teal-500"
								>
									<div>
										<p className="text-gray-800">Doctor</p>
									</div>

									<input
										type="radio"
										name="Role"
										value="doctor"
										onClick={(e) => setRole(e.target.value)}
										id="Doctor"
										className="size-5 border-gray-300 text-teal-500"
									/>
								</label>
							</div>
						</fieldset>
					</div>

					<div>
						<label htmlFor="password" className="sr-only">
							Password
						</label>

						<div className="relative">
							<input
								type={passwordVisible ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
								placeholder="Enter password"
								required
							/>

							<button
								className="absolute inset-y-0 end-0 grid place-content-center px-4"
								onClick={changePasswordVisibility}
								type="button"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="size-4 text-gray-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									/>
								</svg>
							</button>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<p className="text-sm text-gray-500">
							Already have an account?
							<Link to="/login" className="underline px-1">
								Login!
							</Link>
						</p>

						<button
							type="submit"
							className="inline-block rounded-lg bg-teal-500 px-5 py-3 text-sm font-medium text-white"
						>
							Sign Up
						</button>
					</div>
				</form>
			</div>

			<div className="w-full sm:h-96 lg:h-full lg:w-1/2">
				<img
					alt="background"
					src={background}
					className="inset-0 h-full w-full object-cover"
				/>
			</div>
		</div>
	);
};

export default RegisterRage;
