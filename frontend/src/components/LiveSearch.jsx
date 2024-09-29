import { useEffect, useState, useCallback, useRef } from "react";
import { useGetSearchResults } from "../api/SearchResultsApi";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const LiveSearch = ({ renderItem }) => {
	const [focusedIndex, setFocusedIndex] = useState(-1);
	const resultContainer = useRef(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [showResults, setShowResults] = useState(false);
	const { results, loading } = useGetSearchResults(searchQuery);
	const navigate = useNavigate();

	const handleSelection = (selectedIndex) => {
		const selectedItem = results[selectedIndex];
		if (!selectedItem) return resetSearchComplete();
		navigate(`/doctor/${selectedItem._id}`);
		resetSearchComplete();
	};

	const resetSearchComplete = useCallback(() => {
		setFocusedIndex(-1);
		setShowResults(false);
	}, []);

	const handleKeyDown = (e) => {
		const { key } = e;
		let nextIndexCount = 0;

		if (key === "ArrowDown")
			nextIndexCount = (focusedIndex + 1) % results.length;

		if (key === "ArrowUp")
			nextIndexCount =
				(focusedIndex + results.length - 1) % results.length;

		if (key === "Escape") {
			resetSearchComplete();
		}

		if (key === "Enter") {
			e.preventDefault();
			handleSelection(focusedIndex);
		}

		setFocusedIndex(nextIndexCount);
	};

	useEffect(() => {
		if (!resultContainer.current) return;
	}, [focusedIndex]);

	useEffect(() => {
		if (results.length > 0 && !showResults) setShowResults(true);
		if (results.length <= 0) setShowResults(false);
	}, [results]);

	if (loading) return <p>Loading...</p>;

	return (
		<div className="flex items-center justify-center">
			<div
				onBlur={resetSearchComplete}
				onKeyDown={handleKeyDown}
				className="relative"
			>
				<div className="relative">
					<input
						type="text"
						className="sm:w-[600px] px-5 py-3 text-lg rounded-full border-2 border-teal-500 focus:border-teal-700 outline-none transition"
						placeholder="Search a doctor..."
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<Search className="absolute right-4 top-4 text-teal-700" />
				</div>
				{showResults && (
					<div className="absolute mt-1 w-full p-2 bg-white shadow-lg rounded-b max-h-56 overflow-y-auto">
						{results?.map((item, index) => {
							return (
								<div
									key={index}
									onMouseDown={() => handleSelection(index)}
									ref={
										index === focusedIndex
											? resultContainer
											: null
									}
									style={{
										backgroundColor:
											index === focusedIndex
												? "rgba(0,0,0,0.1)"
												: "",
									}}
									className="cursor-pointer hover:bg-black hover:bg-opacity-10 p-2"
								>
									{renderItem(item)}
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default LiveSearch;
