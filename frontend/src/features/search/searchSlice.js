import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
	results: [],
	status: "idle",
	error: null,
};

export const fetchSearchResults = createAsyncThunk(
	"search/fetchSearchResults",
	async (query, { getState, rejectWithValue }) => {
		if (!query) {
			return [];
		}
		const { token } = getState().auth;
		if (!token) {
			return rejectWithValue("Authentication token not found.");
		}
		try {
			const response = await fetch(
				`${API_BASE_URL}/api/v1/doctor/all/${query}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			const data = await response.json();
			if (!response.ok) {
				return rejectWithValue(data);
			}
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const searchSlice = createSlice({
	name: "search",
	initialState,
	reducers: {
		clearSearchResults: (state) => {
			state.results = [];
			state.status = "idle";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSearchResults.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchSearchResults.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.results = action.payload;
			})
			.addCase(fetchSearchResults.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			});
	},
});

export const { clearSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
