import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import background from "../assets/login-bg.jpg";

const LoginPage = () => {
	// This local UI state remains the same
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Initialize Redux and navigation hooks
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Get auth state from the Redux store
	const { user, status, error } = useSelector((state) => state.auth);

	// This effect still handles redirecting if the user is already logged in
	useEffect(() => {
		if (user) {
			navigate("/dashboard");
		}
	}, [user, navigate]);

	// This local UI function remains the same
	const changePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};

	// The login handler now dispatches the Redux action
	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await dispatch(loginUser({ email, password })).unwrap();
			// We can navigate here explicitly after a successful login
			// The useEffect above also serves as a backup for this logic
			navigate("/dashboard");
		} catch (err) {
			// The error from `rejectWithValue` is caught here
			console.error("Failed to login:", err);
		}
	};

	return (
		<div className="flex flex-wrap lg:h-screen lg:items-center">
			<div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-12">
				<div className="mx-auto max-w-lg text-center">
					<h1 className="text-2xl font-bold sm:text-3xl">
						Welcome Back! Log In to Your Account
					</h1>

					<p className="mt-4 text-gray-500">
						Access your personalized healthcare dashboard, manage
						appointments, and stay connected with your healthcare
						providers.
					</p>
				</div>

				<form
					onSubmit={handleLogin}
					className="mx-auto mb-0 mt-8 max-w-md space-y-4"
				>
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
								{/* SVG for password visibility toggle */}
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
							Don't have an account?
							<Link to="/register" className="underline px-1">
								Register!
							</Link>
						</p>

						<button
							type="submit"
							// Disable button while loading
							disabled={status === "loading"}
							className="inline-block rounded-lg bg-teal-500 px-5 py-3 text-sm font-medium text-white disabled:bg-teal-300"
						>
							{/* Show loading text */}
							{status === "loading" ? "Signing In..." : "Sign In"}
						</button>
					</div>
					{/* Optionally, display an error message on failure */}
					{status === "failed" && error && (
						<p className="text-center text-sm font-medium text-red-500">
							{error.message ||
								"Login failed. Please check your credentials."}
						</p>
					)}
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

export default LoginPage;
