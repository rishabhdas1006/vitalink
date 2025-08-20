import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DoctorDetails from "../components/DoctorDetails";
import PatientDetails from "../components/PatientDetails";
import Loading from "../components/Loading";

const DetailsPage = () => {
	const { user, status } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (status === "succeeded" && !user) {
			navigate("/register");
		}
	}, [user, status, navigate]);

	if (status === "loading" || status === "idle") {
		return <Loading />;
	}

	if (!user) {
		return null;
	}

	return (
		<>{user.role === "doctor" ? <DoctorDetails /> : <PatientDetails />}</>
	);
};

export default DetailsPage;
