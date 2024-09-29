import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DoctorDetails from "../components/DoctorDetails";
import PatientDetails from "../components/PatientDetails";

const DetailsPage = () => {
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate("/register");
		}
	}, []);

	return (
		<>{user.role === "doctor" ? <DoctorDetails /> : <PatientDetails />}</>
	);
};

export default DetailsPage;
