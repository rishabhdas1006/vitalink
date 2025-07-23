import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DoctorDetails from "../components/DoctorDetails";
import PatientDetails from "../components/PatientDetails";
import Loading from "../components/Loading"; // Assuming you have a loading component

const DetailsPage = () => {
	// Select user and status from the Redux store
	const { user, status } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	useEffect(() => {
		// Wait until the initial auth check is done
		if (status === "succeeded" && !user) {
			// If the check is done and there's still no user, then redirect
			navigate("/register");
		}
		// This effect should re-run if the status or user changes
	}, [user, status, navigate]);

	// Show a loading screen while we're checking for a user
	if (status === "loading" || status === "idle") {
		return <Loading />;
	}

	// If the check is done and there's no user, render nothing while we redirect
	if (!user) {
		return null;
	}

	// Now it's safe to access user.role
	return (
		<>{user.role === "doctor" ? <DoctorDetails /> : <PatientDetails />}</>
	);
};

export default DetailsPage;
