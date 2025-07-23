import { useEffect, useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	fetchSearchResults,
	clearSearchResults,
} from "../features/search/searchSlice";
import { useNavigate } from "react-router-dom";
import { Search, LoaderCircle } from "lucide-react"; // Added a loading icon

const LiveSearch = ({ renderItem }) => {
	// Local UI state remains the same
	const [focusedIndex, setFocusedIndex] = useState(-1);
	const [searchQuery, setSearchQuery] = useState("");
	const resultContainer = useRef(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	// Get search state from the Redux store
	const { results, status } = useSelector((state) => state.search);

	// This effect handles debounced searching
	useEffect(() => {
		// Don't search if the query is empty
		if (searchQuery.trim() === "") {
			dispatch(clearSearchResults());
			return;
		}

		// Set a timer to dispatch the search action after 300ms
		const debounceTimer = setTimeout(() => {
			dispatch(fetchSearchResults(searchQuery));
		}, 300);

		// Cleanup function to cancel the timer if the user keeps typing
		return () => clearTimeout(debounceTimer);
	}, [searchQuery, dispatch]);

	const resetSearchComplete = useCallback(() => {
		setFocusedIndex(-1);
		setSearchQuery(""); // Clear the input field
		dispatch(clearSearchResults()); // Clear the results in Redux
	}, [dispatch]);

	const handleSelection = (selectedIndex) => {
		const selectedItem = results[selectedIndex];
		if (!selectedItem) return resetSearchComplete();
		navigate(`/doctor/${selectedItem._id}`);
		resetSearchComplete();
	};

	const handleKeyDown = (e) => {
		const { key } = e;
		let nextIndexCount = 0;

		// The keyboard navigation logic remains the same
		if (key === "ArrowDown") {
			nextIndexCount = (focusedIndex + 1) % results.length;
		} else if (key === "ArrowUp") {
			nextIndexCount =
				(focusedIndex + results.length - 1) % results.length;
		} else if (key === "Escape") {
			resetSearchComplete();
		} else if (key === "Enter") {
			e.preventDefault();
			handleSelection(focusedIndex);
		}

		setFocusedIndex(nextIndexCount);
	};

	return (
		<div className="flex items-center justify-center">
			<div
				// The onBlur is removed to allow clicking on search results
				onKeyDown={handleKeyDown}
				className="relative"
			>
				<div className="relative">
					<input
						type="text"
						value={searchQuery}
						className="sm:w-[600px] px-5 py-3 text-lg rounded-full border-2 border-teal-500 focus:border-teal-700 outline-none transition"
						placeholder="Search for doctors..."
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					{/* Show a loading spinner or search icon */}
					{status === "loading" ? (
						<LoaderCircle className="absolute right-4 top-4 text-teal-700 animate-spin" />
					) : (
						<Search className="absolute right-4 top-4 text-teal-700" />
					)}
				</div>

				{/* Conditionally render results based on Redux state */}
				{searchQuery && (
					<div className="absolute mt-1 w-full p-2 bg-white shadow-lg rounded-b-lg max-h-56 overflow-y-auto">
						{status === "succeeded" && results.length === 0 && (
							<div className="p-2 text-gray-500">
								No results found.
							</div>
						)}
						{status === "succeeded" &&
							results.map((item, index) => (
								<div
									key={item._id} // Use a stable key like item._id
									onMouseDown={() => handleSelection(index)}
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
							))}
					</div>
				)}
			</div>
		</div>
	);
};

export default LiveSearch;
