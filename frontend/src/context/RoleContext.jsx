import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RoleContext = createContext();

export const useRole = () => {
	const role = useContext(RoleContext);
	return role;
};

export const RoleProvider = ({ children }) => {
	const { user } = useAuth();
	const [roleData, setRoleData] = useState(() => {
		const storedRoleData = localStorage.getItem("storedRoleData");
		return storedRoleData ? JSON.parse(storedRoleData) : null;
	});
	const navigate = useNavigate();

	const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
	const token = localStorage.getItem("authToken");

	useEffect(() => {
		const roleId = user ? user.roleRefId : null;
		if (token && roleId) {
			fetchRoleData(token);
		}
	}, []);

	const fetchRoleData = async (token) => {
		try {
			const response = await fetch(
				`${API_BASE_URL}/api/v1/${user.role}/${user.roleRefId}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			const data = await response.json();
			setRoleData(data.roleData);
		} catch (error) {
			console.error("Failed to fetch role data:", error);
			localStorage.removeItem("storedRoleData");
		}
	};

	const postRoleData = async (role, roleDetails) => {
		try {
			const response = await fetch(`${API_BASE_URL}/api/v1/${role}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ roleData: roleDetails }),
			});
			const data = await response.json();
			if (data.roleData) {
				localStorage.setItem(
					"storedRoleData",
					JSON.stringify(data.roleData)
				);
				setRoleData(data.roleData);
				navigate("/dashboard");
			}
		} catch (error) {
			console.error("Login error:", error);
		}
	};

	return (
		<RoleContext.Provider value={{ roleData, postRoleData }}>
			{children}
		</RoleContext.Provider>
	);
};
