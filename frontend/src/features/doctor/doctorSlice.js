import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
	details: null,
	status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
	error: null,
};

// This thunk replaces your useGetDoctorDetails hook logic
export const fetchDoctorById = createAsyncThunk(
	"doctor/fetchDoctorById",
	async (userId, { getState, rejectWithValue }) => {
		// Get the token from the auth slice instead of localStorage
		const { token } = getState().auth;
		if (!token) {
			return rejectWithValue("Authentication token not found.");
		}

		try {
			// 1. Using the correct endpoint from your API file
			const response = await fetch(
				`${API_BASE_URL}/api/v1/auth/detail/${userId}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			const result = await response.json();
			if (!response.ok) {
				return rejectWithValue(result);
			}

			// 2. Returning the entire result object as per your logic
			return result;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const doctorSlice = createSlice({
	name: "doctor",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDoctorById.pending, (state) => {
				state.status = "loading";
				state.details = null; // Clear old details on new fetch
			})
			.addCase(fetchDoctorById.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.details = action.payload;
			})
			.addCase(fetchDoctorById.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			});
	},
});

export default doctorSlice.reducer;
