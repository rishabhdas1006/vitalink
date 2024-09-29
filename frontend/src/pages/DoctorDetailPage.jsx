import { useParams } from "react-router-dom";
import { useGetDoctorDetails } from "../api/DoctorDetailsApi";
import { Link } from "react-router-dom";
import { CircleUserRound, Brush } from "lucide-react";
import Button from "../components/Button";
import Loading from "../components/Loading";

const DoctorDetailPage = () => {
	const params = useParams();
	const { details, loading } = useGetDoctorDetails(params.userId);

	if (loading) return <Loading />;

	return (
		<div className="flex justify-center items-center">
			<div className="mx-auto max-w-screen-lg">
				<div className="relative flex w-full max-w-screen-lg flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-md p-6">
					<div className="relative flex flex-col items-center gap-4 pt-0 pb-4 mx-0 mt-4 overflow-hidden text-gray-700 bg-transparent shadow-none rounded-xl bg-clip-border sm:flex-row">
						<CircleUserRound size={120} strokeWidth={1.5} />
						<div className="flex w-full flex-col gap-0.5">
							<div className="flex items-center justify-between pt-4">
								<h5 className="text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
									{details?.name}
								</h5>
								<div className="flex items-center">
									<svg
										className="w-4 h-4 text-yellow-300 me-1"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 22 20"
									>
										<path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
									</svg>
									<p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
										{details.ratingDetail.avg}
									</p>
									<span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
									<span className="text-sm font-medium text-center text-gray-900 underline hover:no-underline dark:text-white">
										{details.ratingDetail.cnt} reviews
									</span>
								</div>
							</div>
							<p className="block text-base antialiased font-light leading-relaxed text-blue-gray-900">
								{details?.roleDetail.qualification}
							</p>
						</div>
					</div>
					<div className="p-0 mb-3">
						<div className="text-lg py-3 font-light">
							<Brush />
							<div className="py-2">
								{details?.roleDetail.bio}
							</div>
						</div>
						<div className="py-3 text-base">
							<div className="font-light pr-4">
								Specialization
							</div>
							<div className="text-xl font-bold">
								{details?.roleDetail.specialization}
							</div>
						</div>
						<div className="py-3 text-base">
							<div className="font-light pr-4">
								Years Of Experience
							</div>
							<div className="text-xl font-bold">
								{details?.roleDetail.yearsOfExperience}
							</div>
						</div>
						<div className="py-3 text-base">
							<div className="font-light pr-4">
								Available Hours
							</div>
							<div className="text-xl font-bold">
								{details?.roleDetail.availableHours.startTime} {" - "}
								{details?.roleDetail.availableHours.endTime}
							</div>
						</div>
						<Link
							to={`/book/${details._id}`}
							className="flex justify-center pt-6"
						>
							<Button content={"Book an Appointment"} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DoctorDetailPage;
