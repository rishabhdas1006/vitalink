import hero from "../assets/hero.jpg";

const Hero = () => {
	return (
		<>
			<section
				style={{
					background: `url(${hero})`,
					backgroundSize: `cover`,
				}}
				className="relative bg-contain bg-center bg-no-repeat"
			>
				<div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 sm:bg-gradient-to-r"></div>

				<div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
					<div className="max-w-xl text-center sm:text-left">
						<h1 className="text-3xl font-extrabold sm:text-5xl">
							Your Health,
							<strong className="block font-extrabold text-rose-700">
								{" "}
								Our Priority{" "}
							</strong>
						</h1>

						<p className="mt-4 max-w-lg sm:text-xl/relaxed">
							Experience seamless healthcare management with easy
							appointment booking, expert consultations, and
							personalized care all in one place.
						</p>
					</div>
				</div>
			</section>
		</>
	);
};

export default Hero;
