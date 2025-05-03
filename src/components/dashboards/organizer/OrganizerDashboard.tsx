import DashboardLayout from "../DashboardLayout";
import OrganizerLeft from "./OrganizerLeft";
import OrganizerMiddle from "./OrganizerMiddle";
import OrganizerRight from "./OrganizerRight";


const OrganizerDashboard = () => (
	<DashboardLayout
		left={<OrganizerLeft />}
		middle={<OrganizerMiddle />}
		right={<OrganizerRight />}
	/>
);

export default OrganizerDashboard;
