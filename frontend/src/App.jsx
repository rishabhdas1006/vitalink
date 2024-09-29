import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { RoleProvider } from "./context/RoleContext.jsx";
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
	return (
		<BrowserRouter>
			<AuthProvider>
				<RoleProvider>
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
				</RoleProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
