import DashboardLayout from "../DashboardLayout";
import VolunteerLeft from "./VolunteerLeft";
import VolunteerMiddle from "./VolunteerMiddle";
import VolunteerRight from "./VolunteerRight";

const VolunteerDashboard = () => (
	<DashboardLayout
		left={<VolunteerLeft />}
		middle={<VolunteerMiddle />}
		right={<VolunteerRight />}
	/>
);

export default VolunteerDashboard;
