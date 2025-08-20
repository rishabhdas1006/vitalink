import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchUserProfile, fetchRoleDetails } from "./features/auth/authSlice";
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
    useEffect(() => {
        if (token) {
            dispatch(fetchUserProfile())
                .unwrap()
                .then(() => {
                    dispatch(fetchRoleDetails());
                })
                .catch((err) => {
                    console.error("Failed to fetch initial user data:", err);
                });
        }
    }, [dispatch, token]);

    return (
        <BrowserRouter>
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