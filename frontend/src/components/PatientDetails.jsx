import { useState } from "react";
import { useRole } from "../context/RoleContext";

const PatientDetails = () => {
	const { postRoleData } = useRole();
	const [medicalHistory, setMedicalHistory] = useState("");
	const [allergies, setAllergies] = useState("");
	const [medications, setMedications] = useState("");
	const [insuranceDetails, setInsuranceDetails] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		postRoleData("patient", {
			medicalHistory,
			allergies,
			medications,
			insuranceDetails,
		});
	};

	return (
		<div className="bg-gray-100">
			<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
					<div className="lg:col-span-2 lg:py-12">
						<div className="mb-8 text-2xl font-bold text-pink-600">
							Please provide the following details to complete
							your profile:
						</div>

						<div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
							<dl className="-my-3 divide-y divide-gray-100 text-sm">
								<div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
									<dt className="font-medium text-gray-900">
										Medical History
									</dt>
									<dd className="text-gray-700 sm:col-span-2">
										Share relevant details about your past
										medical conditions and treatments
									</dd>
								</div>

								<div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
									<dt className="font-medium text-gray-900">
										Allergies
									</dt>
									<dd className="text-gray-700 sm:col-span-2">
										Mention any known allergies
										(medications, food, etc.)
									</dd>
								</div>

								<div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
									<dt className="font-medium text-gray-900">
										Medications
									</dt>
									<dd className="text-gray-700 sm:col-span-2">
										List the medications you are currently
										taking
									</dd>
								</div>

								<div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
									<dt className="font-medium text-gray-900">
										Insurance Details
									</dt>
									<dd className="text-gray-700 sm:col-span-2">
										Provide your insurance information for
										billing and claims.
									</dd>
								</div>
							</dl>
						</div>
					</div>

					<div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
						<form className="space-y-4" onSubmit={handleSubmit}>
							<div>
								<div>Medical History</div>
								<div>
									<label
										className="sr-only"
										htmlFor="medicalHistory"
									>
										Medical History
									</label>

									<textarea
										value={medicalHistory}
										onChange={(e) =>
											setMedicalHistory(e.target.value)
										}
										className="w-full rounded-lg border-gray-200 p-3 text-sm"
										placeholder="Medical History"
										rows="4"
										id="medicalHistory"
										required
									></textarea>
								</div>
							</div>

							<div>
								<div>
									Allergies
									<span className="text-slate-600 text-sm sm:px-2">
										(If any)
									</span>
								</div>
								<div>
									<label
										className="sr-only"
										htmlFor="allergies"
									>
										Allergies
									</label>

									<textarea
										value={allergies}
										onChange={(e) =>
											setAllergies(e.target.value)
										}
										className="w-full rounded-lg border-gray-200 p-3 text-sm"
										placeholder="Allergies"
										rows="2"
										id="allergies"
									></textarea>
								</div>
							</div>

							<div>
								<div>
									Medications
									<span className="text-slate-600 text-sm sm:px-2">
										(If any)
									</span>
								</div>
								<div>
									<label
										className="sr-only"
										htmlFor="medications"
									>
										Medications
									</label>

									<textarea
										value={medications}
										onChange={(e) =>
											setMedications(e.target.value)
										}
										className="w-full rounded-lg border-gray-200 p-3 text-sm"
										placeholder="Medications"
										rows="2"
										id="medications"
									></textarea>
								</div>
							</div>

							<div>
								<div>
									Insurance Details
									<span className="text-slate-600 text-sm sm:px-2">
										(If any)
									</span>
								</div>
								<div>
									<label
										className="sr-only"
										htmlFor="insuranceDetails"
									>
										Insurance Details
									</label>

									<textarea
										value={insuranceDetails}
										onChange={(e) =>
											setInsuranceDetails(e.target.value)
										}
										className="w-full rounded-lg border-gray-200 p-3 text-sm"
										placeholder="Insurance Details"
										rows="2"
										id="insuranceDetails"
									></textarea>
								</div>
							</div>

							<div className="mt-4">
								<button
									type="submit"
									className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
								>
									Enter
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PatientDetails;
