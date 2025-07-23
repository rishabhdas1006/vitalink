import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const MainNav = () => {
	// Get the user object from the Redux store
	const user = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		navigate("/login");
	};

	return (
		<div className="sm:flex sm:items-center sm:gap-4">
			{user ? (
				<>
					<div className="font-extralight">
						Hi!
						<span className="font-bold px-2">{user.name}</span>
					</div>
					<Link
						to="/dashboard"
						className="rounded-md cursor-pointer px-4 text-sm py-2.5 border border-teal-200 text-gray-500 transition hover:text-gray-500/75"
					>
						Dashboard
					</Link>
					<button
						className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
						onClick={handleLogout}
					>
						Logout
					</button>
				</>
			) : (
				<>
					<Link
						className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
						to="/register"
					>
						Register
					</Link>
					<Link
						className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
						to="/login"
					>
						Login
					</Link>
				</>
			)}
		</div>
	);
};

export default MainNav;
