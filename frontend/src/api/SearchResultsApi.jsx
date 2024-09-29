import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetSearchResults = (query) => {
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getSearchResults = async () => {
			try {
				if (query === "") {
					setLoading(false);
					return;
				}

				const token = localStorage.getItem("authToken");
				const response = await fetch(
					`${API_BASE_URL}/api/v1/doctor/all/${query}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				const result = await response.json();
				setResults(result);
				setLoading(false);
				// console.log(result);
			} catch (error) {
				console.log("Failed to get results", error);
				setLoading(false);
			}
		};

		getSearchResults();
	}, [query]);

	return { results, loading };
};
