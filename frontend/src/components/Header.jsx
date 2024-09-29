import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainNav from "./MainNav";
import logo from "../assets/logo.png";
import SideBar from "./SideBar";

const Header = () => {
	const [showSideBar, setShowSideBar] = useState(false);

	const handleSideBarClick = () => {
		setShowSideBar(!showSideBar);
	};

	return (
		<header className="bg-white">
			<div className="mx-auto max-w-screen-xl px-4">
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
						<div className="flex items-center gap-4">
							<div className="hidden sm:block">
								<MainNav />
							</div>
							<div className="block sm:hidden">
								<SideBar
									showSideBar={showSideBar}
									handleSideBarClick={handleSideBarClick}
								/>
								<button
									className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
									onClick={handleSideBarClick}
								>
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
