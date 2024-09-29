import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
	const auth = useContext(AuthContext);
	return auth;
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		const storedUser = localStorage.getItem("storedUser");
		return storedUser ? JSON.parse(storedUser) : null;
	});
	const navigate = useNavigate();

	const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

	useEffect(() => {
		const token = localStorage.getItem("authToken");
		if (token) {
			fetchUser(token);
		}
	}, []);

	const fetchUser = async (token) => {
		try {
			const response = await fetch(
				`${API_BASE_URL}/api/v1/auth/profile`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			const data = await response.json();
			setUser(data.user);
		} catch (error) {
			console.error("Failed to fetch user:", error);
			localStorage.removeItem("authToken");
			localStorage.removeItem("storedUser");
			localStorage.removeItem("storedRoleData");
		}
	};

	const register = async (name, email, phone, address, role, password) => {
		try {
			const response = await fetch(
				`${API_BASE_URL}/api/v1/auth/register`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						name,
						email,
						phone,
						address,
						role,
						password,
					}),
				}
			);
			const data = await response.json();
			if (data.token) {
				localStorage.setItem("authToken", data.token);
				localStorage.setItem("storedUser", JSON.stringify(data.user));
				setUser(data.user);
				navigate("/details");
			}
		} catch (error) {
			console.error("Register error:", error);
		}
	};

	const login = async (email, password) => {
		try {
			const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			const data = await response.json();
			if (data.token) {
				localStorage.setItem("authToken", data.token);
				localStorage.setItem("storedUser", JSON.stringify(data.user));
				setUser(data.user);
				navigate("/dashboard");
			}
		} catch (error) {
			console.error("Login error:", error);
		}
	};

	const logout = () => {
		localStorage.removeItem("authToken");
		localStorage.removeItem("storedUser");
		localStorage.removeItem("storedRoleData");
		setUser(null);
		navigate("/login");
	};

	return (
		<AuthContext.Provider value={{ user, register, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
