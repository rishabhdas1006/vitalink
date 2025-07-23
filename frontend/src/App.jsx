import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchUserProfile, fetchRoleDetails } from "./features/auth/authSlice";

// Your Layout and Page components remain the same
import Layout from "./layouts/layout.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import DetailsPage from "./pages/DetailsPage.jsx";
import DoctorDetailPage from "./pages/DoctorDetailPage.jsx";
import AppointmentBookingPage from "./pages/AppointmentBookingPage.jsx";
import AppointmentDetailsPage from "./pages/AppointmentDetailsPage.jsx";

function App() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    // This effect replaces the data-fetching logic from your old AuthProvider
    useEffect(() => {
        // If a token exists, it means the user might be logged in.
        // We dispatch an action to fetch their profile information.
        if (token) {
            dispatch(fetchUserProfile())
                .unwrap()
                .then(() => {
                    // After successfully getting the user, fetch their role details
                    dispatch(fetchRoleDetails());
                })
                .catch((err) => {
                    // This handles cases where the token is invalid or expired
                    console.error("Failed to fetch initial user data:", err);
                });
        }
    }, [dispatch, token]);

    return (
        <BrowserRouter>
            {/* The Context Providers are no longer needed here. */}
            {/* The Redux <Provider> in main.jsx handles everything. */}
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout showHero>
                            <LandingPage />
                        </Layout>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <Layout>
                            <RegisterPage />
                        </Layout>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <Layout>
                            <LoginPage />
                        </Layout>
                    }
                />
                <Route
                    path="/details"
                    element={
                        <Layout>
                            <DetailsPage />
                        </Layout>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <Layout>
                            <Dashboard />
                        </Layout>
                    }
                />
                <Route
                    path="/doctor/:userId"
                    element={
                        <Layout>
                            <DoctorDetailPage />
                        </Layout>
                    }
                />
                <Route
                    path="/book/:userId"
                    element={
                        <Layout>
                            <AppointmentBookingPage />
                        </Layout>
                    }
                />
                <Route
                    path="/appointment/:appointmentId"
                    element={
                        <Layout>
                            <AppointmentDetailsPage />
                        </Layout>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;