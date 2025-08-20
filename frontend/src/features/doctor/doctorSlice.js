import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
	details: null,
	status: "idle",
	error: null,
};

export const fetchDoctorById = createAsyncThunk(
	"doctor/fetchDoctorById",
	async (userId, { getState, rejectWithValue }) => {
		const { token } = getState().auth;
		if (!token) {
			return rejectWithValue("Authentication token not found.");
		}

		try {
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
				state.details = null;
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
