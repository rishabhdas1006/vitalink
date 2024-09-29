import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetDoctorDetails = (userId) => {
	const [details, setDetails] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getDetails = async () => {
			try {
				const token = localStorage.getItem("authToken");
				const response = await fetch(
					`${API_BASE_URL}/api/v1/auth/detail/${userId}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				const result = await response.json();
				setDetails(result);
				setLoading(false);
			} catch (error) {
				console.log("Failed to get results", error);
				setLoading(false);
			}
		};

		getDetails();
	}, [userId]);

	return { details, loading };
};
