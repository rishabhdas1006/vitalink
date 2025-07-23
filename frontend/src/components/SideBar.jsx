import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { X } from "lucide-react";

const SideBar = ({ showSideBar, handleSideBarClick }) => {
	// Get user state from the Redux store
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		handleSideBarClick(); // Close the sidebar first for a smooth UI
		dispatch(logout());
		navigate("/login");
	};

	return (
		<div>
			{/* Close Button */}
			<button
				className={`${
					showSideBar ? "fixed" : "hidden"
				} z-50 top-0 right-0 flex justify-end text-white p-5`}
				onClick={handleSideBarClick}
			>
				<X size={32} />
			</button>

			{/* Sidebar Panel */}
			<div
				className={`z-40 pl-8 pt-14 pr-16 fixed top-0 right-0 bg-teal-700 text-white h-full flex flex-col transition-all duration-700 ${
					showSideBar ? "" : "translate-x-full"
				}`}
			>
				{user ? (
					// Authenticated User View
					<>
						<div className="font-extralight py-4">
							<div>Hi!</div>
							<div className="font-light text-2xl">
								{user.name}
							</div>
						</div>

						<div>
							<ul className="text-sm font-medium">
								<li>
									<Link
										className="active flex items-center rounded py-2 text-gray-50 focus:text-gray-400"
										to="/dashboard"
										onClick={handleSideBarClick}
									>
										<span className="select-none">
											Dashboard
										</span>
									</Link>
								</li>
								<li>
									<button
										className="flex items-center rounded py-2 text-gray-50 focus:text-gray-400"
										onClick={handleLogout}
									>
										<span className="select-none">
											Logout
										</span>
									</button>
								</li>
							</ul>
						</div>
					</>
				) : (
					// Guest View
					<>
						<div>
							<ul className="font-medium">
								<li>
									<Link
										className="flex items-center rounded p-2 text-gray-50 focus:text-gray-400"
										to="/register"
										onClick={handleSideBarClick}
									>
										<span className="select-none">
											Register
										</span>
									</Link>
								</li>
								<li>
									<Link
										className="flex items-center rounded p-2 text-gray-50 focus:text-gray-400"
										to="/login"
										onClick={handleSideBarClick}
									>
										<span className="select-none">
											Login
										</span>
									</Link>
								</li>
							</ul>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default SideBar;
