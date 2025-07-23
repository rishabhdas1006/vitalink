import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import doctorReducer from "./features/doctor/doctorSlice";
import appointmentReducer from "./features/appointment/appointmentSlice";
import searchReducer from "./features/search/searchSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		doctor: doctorReducer,
		appointment: appointmentReducer,
		search: searchReducer,
	},
});

/**
 * JSDoc type definitions for JS autocompletion
 * @typedef {ReturnType<typeof store.getState>} RootState
 * @typedef {typeof store.dispatch} AppDispatch
 */
