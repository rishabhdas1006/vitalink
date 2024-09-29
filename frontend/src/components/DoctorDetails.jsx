import { useState } from "react";
import { useRole } from "../context/RoleContext";

const DoctorDetails = () => {
	const { postRoleData } = useRole();
	const [specialization, setSpecialization] = useState("");
	const [qualification, setQualification] = useState("");
	const [bio, setBio] = useState("");
	const [yearsOfExperience, setYearsOfExperience] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		postRoleData("doctor", {
			specialization,
			qualification,
			bio,
			yearsOfExperience,
			availableHours: {
				startTime,
				endTime,
			},
		});
	};

	return (
		<div className="bg-gray-100">
			<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
					<div className="lg:col-span-2 lg:py-12">
						<div className="mb-8 text-2xl font-bold text-teal-600">
							Please provide the following details to complete
							your profile:
						</div>

						<div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
							<dl className="-my-3 divide-y divide-gray-100 text-sm">
								<div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
									<dt className="font-medium text-gray-900">
										Specialization
									</dt>
									<dd className="text-gray-700 sm:col-span-2">
										Specify your area of expertise (e.g.,
										cardiology, dermatology, etc.)
									</dd>
								</div>

								<div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
									<dt className="font-medium text-gray-900">
										Qualification
									</dt>
									<dd className="text-gray-700 sm:col-span-2">
										List your medical degrees and
										certifications
									</dd>
								</div>

								<div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
									<dt className="font-medium text-gray-900">
										Years of Experience
									</dt>
									<dd className="text-gray-700 sm:col-span-2">
										Mention how many years you've been
										practicing
									</dd>
								</div>

								<div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
									<dt className="font-medium text-gray-900">
										Available Hours
									</dt>
									<dd className="text-gray-700 sm:col-span-2">
										Set the start and end time of your daily
										availability for appointments
									</dd>
								</div>
							</dl>
						</div>
					</div>

					<div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label
									className="sr-only"
									htmlFor="specialization"
								>
									Specialization
								</label>
								<input
									value={specialization}
									onChange={(e) =>
										setSpecialization(e.target.value)
									}
									className="w-full rounded-lg border-gray-200 p-3 text-sm"
									placeholder="Specialization"
									type="text"
									id="specialization"
									required
								/>
							</div>

							<div>
								<label className="sr-only" htmlFor="bio">
									Bio
								</label>
								<input
									value={bio}
									onChange={(e) => setBio(e.target.value)}
									className="w-full rounded-lg border-gray-200 p-3 text-sm"
									placeholder="Bio"
									type="text"
									id="bio"
									required
								/>
							</div>

							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div>
									<label
										className="sr-only"
										htmlFor="qualification"
									>
										Qualification
									</label>
									<input
										value={qualification}
										onChange={(e) =>
											setQualification(e.target.value)
										}
										className="w-full rounded-lg border-gray-200 p-3 text-sm"
										placeholder="Qualification"
										type="text"
										id="qualification"
										required
									/>
								</div>

								<div>
									<label
										className="sr-only"
										htmlFor="yearsOfExperience"
									>
										Years of Experience
									</label>
									<input
										value={yearsOfExperience}
										onChange={(e) =>
											setYearsOfExperience(e.target.value)
										}
										className="w-full rounded-lg border-gray-200 p-3 text-sm"
										placeholder="Years of Experience"
										type="string"
										id="yearsOfExperience"
										required
									/>
								</div>
							</div>

							<div>
								<div className="py-2">
									Available Hours
									<span className="text-slate-600 text-sm sm:px-2">
										(Format: HHMM in 24-hour format)
									</span>
								</div>
								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
									<div>
										<label
											className="sr-only"
											htmlFor="startTime"
										>
											Start Time
										</label>
										<input
											value={startTime}
											onChange={(e) =>
												setStartTime(e.target.value)
											}
											className="w-full rounded-lg border-gray-200 p-3 text-sm"
											placeholder="Start Time"
											type="text"
											id="startTime"
											required
										/>
									</div>

									<div>
										<label
											className="sr-only"
											htmlFor="endTime"
										>
											End Time
										</label>
										<input
											value={endTime}
											onChange={(e) =>
												setEndTime(e.target.value)
											}
											className="w-full rounded-lg border-gray-200 p-3 text-sm"
											placeholder="End Time"
											type="string"
											id="endTime"
											required
										/>
									</div>
								</div>
							</div>

							<div className="mt-4">
								<button
									type="submit"
									className="inline-block w-full rounded-lg bg-teal-600 px-5 py-3 font-medium text-white sm:w-auto"
								>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DoctorDetails;
