import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
const Layout = ({ children, showHero = false }) => {
	return (
		<div className="flex flex-col justify-between min-h-screen">
			<Header />
			<main className="">
				{showHero && <Hero />}
				{children}
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
