import OrganizerDashboard from "@/components/dashboards/organizer/OrganizerDashboard";
import VolunteerDashboard from "@/components/dashboards/volunteer/VolunteerDashboard";

const Dashboard = () => {
	const role = "volunteer"; // mock, replace with context later
	return role === "volunteer" ? (
		<OrganizerDashboard />
	) : (
		<VolunteerDashboard />
	);
};

export default Dashboard;
