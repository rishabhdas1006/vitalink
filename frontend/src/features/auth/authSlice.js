import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const initialState = {
	user: JSON.parse(localStorage.getItem("storedUser")) || null,
	roleData: JSON.parse(localStorage.getItem("storedRoleData")) || null,
	token: localStorage.getItem("authToken") || null,
	status: "idle",
	error: null,
};

export const loginUser = createAsyncThunk(
	"auth/loginUser",
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			const data = await response.json();
			if (!response.ok) {
				return rejectWithValue(data);
			}
			localStorage.setItem("authToken", data.token);
			localStorage.setItem("storedUser", JSON.stringify(data.user));
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const registerUser = createAsyncThunk(
	"auth/registerUser",
	async (userData, { rejectWithValue }) => {
		try {
			const response = await fetch(
				`${API_BASE_URL}/api/v1/auth/register`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(userData),
				}
			);
			const data = await response.json();
			if (!response.ok) {
				return rejectWithValue(data);
			}
			localStorage.setItem("authToken", data.token);
			localStorage.setItem("storedUser", JSON.stringify(data.user));
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const postRoleDetails = createAsyncThunk(
	"auth/postRoleDetails",
	async ({ role, roleDetails }, { getState, rejectWithValue }) => {
		try {
			const { token } = getState().auth;
			const response = await fetch(`${API_BASE_URL}/api/v1/${role}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ roleData: roleDetails }),
			});
			const data = await response.json();
			if (!response.ok) {
				return rejectWithValue(data);
			}
			localStorage.setItem(
				"storedRoleData",
				JSON.stringify(data.roleData)
			);
			return data.roleData;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const fetchUserProfile = createAsyncThunk(
	"auth/fetchUserProfile",
	async (_, { getState, rejectWithValue }) => {
		const { token } = getState().auth;
		if (!token) return rejectWithValue("No token found");
		try {
			const response = await fetch(
				`${API_BASE_URL}/api/v1/auth/profile`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			const data = await response.json();
			if (!response.ok) return rejectWithValue(data);
			localStorage.setItem("storedUser", JSON.stringify(data.user));
			return data.user;
		} catch (error) {
			localStorage.removeItem("authToken");
			localStorage.removeItem("storedUser");
			localStorage.removeItem("storedRoleData");
			return rejectWithValue(error.message);
		}
	}
);

export const fetchRoleDetails = createAsyncThunk(
	"auth/fetchRoleDetails",
	async (_, { getState, rejectWithValue }) => {
		const { token, user } = getState().auth;
		if (!token || !user?.role || !user?.roleRefId) {
			return rejectWithValue("Missing user data for role fetch");
		}
		try {
			const response = await fetch(
				`${API_BASE_URL}/api/v1/${user.role}/${user.roleRefId}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			const data = await response.json();
			if (!response.ok) return rejectWithValue(data);
			localStorage.setItem(
				"storedRoleData",
				JSON.stringify(data.roleData)
			);
			return data.roleData;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			localStorage.removeItem("authToken");
			localStorage.removeItem("storedUser");
			localStorage.removeItem("storedRoleData");
			state.user = null;
			state.roleData = null;
			state.token = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.status = "loading";
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.user = action.payload.user;
				state.token = action.payload.token;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.user = action.payload.user;
				state.token = action.payload.token;
			})
			.addCase(postRoleDetails.fulfilled, (state, action) => {
				state.roleData = action.payload;
			})
			.addCase(fetchUserProfile.fulfilled, (state, action) => {
				state.user = action.payload;
				state.status = "succeeded";
			})
			.addCase(fetchUserProfile.rejected, (state) => {
				state.user = null;
				state.token = null;
				state.status = "failed";
			})
			.addCase(fetchRoleDetails.fulfilled, (state, action) => {
				state.roleData = action.payload;
			});
	},
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
