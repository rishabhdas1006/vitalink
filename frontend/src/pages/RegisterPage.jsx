import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import background from "../assets/login-bg.jpg";

// Corrected component name from RegisterRage to RegisterPage
const RegisterPage = () => {
	// Local state for the form inputs remains the same
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [role, setRole] = useState("patient");
	const [password, setPassword] = useState("");
	const [passwordVisible, setPasswordVisible] = useState(false);

	// Initialize Redux and navigation hooks
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Get auth state from the Redux store
	const { user, status, error } = useSelector((state) => state.auth);

	// Redirect if user is already logged in
	useEffect(() => {
		if (user) {
			navigate("/dashboard");
		}
	}, [user, navigate]);

	// Local UI function remains the same
	const changePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};

	// The register handler now dispatches the Redux action
	const handleRegister = async (e) => {
		e.preventDefault();
		const userData = { name, email, phone, address, role, password };
		try {
			await dispatch(registerUser(userData)).unwrap();
			// Navigate to the details page on successful registration
			navigate("/details");
		} catch (err) {
			console.error("Failed to register:", err);
		}
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
					{/* Name Input */}
					<div>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
							placeholder="Enter name"
							required
						/>
					</div>

					{/* Email Input */}
					<div>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
							placeholder="Enter email"
							required
						/>
					</div>

					{/* Phone Input */}
					<div>
						<input
							type="text"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
							placeholder="Enter phone"
						/>
					</div>

					{/* Address Input */}
					<div>
						<input
							type="text"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
							placeholder="Enter address"
						/>
					</div>

					{/* Role Selection */}
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
										checked={role === "patient"}
										onChange={(e) =>
											setRole(e.target.value)
										}
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
										checked={role === "doctor"}
										onChange={(e) =>
											setRole(e.target.value)
										}
										id="Doctor"
										className="size-5 border-gray-300 text-teal-500"
									/>
								</label>
							</div>
						</fieldset>
					</div>

					{/* Password Input */}
					<div>
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
								{/* SVG Icon */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="size-4 text-gray-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
									<path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
								</svg>
							</button>
						</div>
					</div>

					{/* Submission and Login Link */}
					<div className="flex items-center justify-between">
						<p className="text-sm text-gray-500">
							Already have an account?
							<Link to="/login" className="underline px-1">
								Login!
							</Link>
						</p>
						<button
							type="submit"
							disabled={status === "loading"}
							className="inline-block rounded-lg bg-teal-500 px-5 py-3 text-sm font-medium text-white disabled:bg-teal-300"
						>
							{status === "loading" ? "Signing Up..." : "Sign Up"}
						</button>
					</div>
					{/* Optional Error Display */}
					{status === "failed" && error && (
						<p className="text-center text-sm font-medium text-red-500">
							{error.message ||
								"Registration failed. Please try again."}
						</p>
					)}
				</form>
			</div>

			{/* Background Image */}
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

export default RegisterPage;
