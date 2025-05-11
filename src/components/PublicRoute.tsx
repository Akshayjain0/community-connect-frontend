import { useAuth } from "@/context/AuthContext";
import { JSX } from "react";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
	const { role, loading } = useAuth();

	if (loading) return <div>Loading...</div>;

	if (role) {
		// Redirect based on role if already logged in
		const roleRedirect = {
			volunteer: "/volunteer/dashboard",
			organizer: "/organizer/dashboard",
		};
		return (
			<Navigate
				to={roleRedirect[role]}
				replace
			/>
		);
	}

	return children;
};
