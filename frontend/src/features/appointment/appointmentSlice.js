import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
	list: [],
	selected: null,
	status: "idle",
	error: null,
};

export const fetchMyAppointments = createAsyncThunk(
	"appointments/fetchMyAppointments",
	async (searchDate, { getState, rejectWithValue }) => {
		const { token } = getState().auth;
		if (!token) {
			return rejectWithValue("Authentication token not found.");
		}
		try {
			const response = await fetch(
				`${API_BASE_URL}/api/v1/appointment/my/${searchDate}`,
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

export const fetchAppointmentById = createAsyncThunk(
	"appointments/fetchAppointmentById",
	async (appointmentId, { getState, rejectWithValue }) => {
		const { token } = getState().auth;
		if (!token) {
			return rejectWithValue("Authentication token not found.");
		}
		try {
			const response = await fetch(
				`${API_BASE_URL}/api/v1/appointment/${appointmentId}`,
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

export const bookNewAppointment = createAsyncThunk(
	"appointments/bookNewAppointment",
	async (appointmentData, { getState, rejectWithValue }) => {
		const { token } = getState().auth;
		if (!token) {
			return rejectWithValue("Authentication token not found.");
		}
		try {
			const response = await fetch(
				`${API_BASE_URL}/api/v1/appointment/`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(appointmentData),
				}
			);
			const data = await response.json();
			if (!response.ok) {
				return rejectWithValue(data);
			}
			return data.appointment;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const appointmentSlice = createSlice({
	name: "appointments",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMyAppointments.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchMyAppointments.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.list = action.payload;
			})
			.addCase(fetchMyAppointments.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			})
			.addCase(fetchAppointmentById.pending, (state) => {
				state.status = "loading";
				state.selected = null;
			})
			.addCase(fetchAppointmentById.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.selected = action.payload;
			})
			.addCase(fetchAppointmentById.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			})
			.addCase(bookNewAppointment.pending, (state) => {
				state.status = "loading";
			})
			.addCase(bookNewAppointment.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.selected = action.payload;
			})
			.addCase(bookNewAppointment.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			});
	},
});

export default appointmentSlice.reducer;
