// // src/context/AuthContext.tsx
// import { createContext, useContext, useEffect, useState } from "react";
// import axiosInstance from "@/lib/axios";

// type Role = "volunteer" | "organizer" | null;

// interface User {
// 	_id: string;
// 	fullName: string;
// 	email: string;
// 	userName: string;
// }

// interface AuthContextType {
// 	user: User | null;
// 	role: Role;
// 	loading: boolean;
// 	refetchUser: () => void;
// }

// const AuthContext = createContext<AuthContextType>({
// 	user: null,
// 	role: null,
// 	loading: true,
// 	refetchUser: () => {},
// });

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
// 	const [user, setUser] = useState<User | null>(null);
// 	const [role, setRole] = useState<Role>(null);
// 	const [loading, setLoading] = useState(true);

// 	const fetchMe = async () => {
// 		try {
// 			const res = await axiosInstance.get("/auth/me");
// 			setUser(res.data.user);
// 			setRole(res.data.role);
// 		} catch (err) {
// 			setUser(null);
// 			setRole(null);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	useEffect(() => {
// 		fetchMe();
// 	}, []);

// 	useEffect(() => {
// 		console.log("🧠 AuthContext role updated:", role);
// 	}, [role]);

// 	return (
// 		<AuthContext.Provider
// 			value={{ user, role, loading, refetchUser: fetchMe }}
// 		>
// 			{children}
// 		</AuthContext.Provider>
// 	);
// };

// export const useAuth = () => useContext(AuthContext);

// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import axiosInstance from "@/lib/axios";

type Role = "volunteer" | "organizer" | null;

// Generic shape of user - allow any fields from backend
interface RawUser {
	_id: string;
	[key: string]: any;
}

interface AuthContextType {
	user: RawUser | null;
	role: Role;
	fullName: string | null;
	loading: boolean;
	refetchUser: () => void;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	role: null,
	fullName: null,
	loading: true,
	refetchUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<RawUser | null>(null);
	const [role, setRole] = useState<Role>(null);
	const [loading, setLoading] = useState(true);

	const fetchMe = async () => {
		try {
			const res = await axiosInstance.get("/auth/me");
			setUser(res.data.user);
			setRole(res.data.role);
		} catch (err) {
			setUser(null);
			setRole(null);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMe();
	}, []);

	const fullName = useMemo(() => {
		if (!user || !role) return null;
		return role === "organizer" ? user.organizer_name : user.fullName;
	}, [user, role]);

	return (
		<AuthContext.Provider
			value={{ user, role, fullName, loading, refetchUser: fetchMe }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
