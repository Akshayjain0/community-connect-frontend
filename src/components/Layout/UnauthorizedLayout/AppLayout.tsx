import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout: React.FC = () => {
	return (
		<div className='flex flex-col min-h-screen'>
			{/* <Header /> */}
			<main className='flex-1'>
				<Outlet />
			</main>
			{/* <Footer /> */}
		</div>
	);
};

export default AppLayout;
