import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";

const Header = () => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<header className="bg-white">
			<div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div className="flex-1 md:flex md:items-center md:gap-12">
						<Link
							className="text-teal-600 flex items-center gap-2"
							to="/"
						>
							<span className="sr-only">Home</span>
							<img src={logo} className="h-12" alt="logo" />
							<span className="text-xl lg:text-2xl font-bold">
								VitaLink
							</span>
						</Link>
					</div>

					<div className="md:flex md:items-center md:gap-12">
						<nav aria-label="Global" className="hidden md:block">
							<ul className="flex items-center gap-6 text-sm">
								<li>
									<Link
										to="/dashboard"
										className="cursor-pointer text-gray-500 transition hover:text-gray-500/75"
									>
										Dashboard
									</Link>
								</li>
							</ul>
						</nav>

						<div className="flex items-center gap-4">
							<div className="sm:flex sm:items-center sm:gap-4">
								{user ? (
									<>
										<div>Hi! {user.name}</div>
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

										<div className="hidden sm:flex">
											<Link
												className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
												to="/login"
											>
												Login
											</Link>
										</div>
									</>
								)}
							</div>

							<div className="block md:hidden">
								<button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="size-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M4 6h16M4 12h16M4 18h16"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
