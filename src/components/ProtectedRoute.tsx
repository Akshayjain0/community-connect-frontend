// // src/components/ProtectedRoute.tsx
// import { Navigate } from "react-router-dom";
// import { useAuth } from "@/context/AuthContext";

// export const ProtectedRoute = ({
// 	children,
// 	allowedRoles,
// }: {
// 	children: React.ReactNode;
// 	allowedRoles: ("volunteer" | "organizer")[];
// }) => {
// 	const { loading, role } = useAuth();

// 	if (loading) return <div>Loading...</div>;

// 	if (!role || !allowedRoles.includes(role)) {
// 		return (
// 			<Navigate
// 				to='/unauthorized'
// 				replace
// 			/>
// 		);
// 	}

// 	return <>{children}</>;
// };

// src/components/ProtectedRoute.tsx
import { useAuth } from "@/context/AuthContext";
import { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
	children: JSX.Element;
	allowedRoles: string[];
};

export const ProtectedRoute = ({ children, allowedRoles }: Props) => {
	const { role, loading } = useAuth();
	const location = useLocation();

	if (loading) return <div>Loading...</div>;

	if (!role) {
		// Not logged in
		return (
			<Navigate
				to='/login/user'
				state={{ from: location }}
				replace
			/>
		);
	}

	if (!allowedRoles.includes(role)) {
		// Role not allowed
		return (
			<Navigate
				to='/'
				replace
			/>
		);
	}

	return children;
};
