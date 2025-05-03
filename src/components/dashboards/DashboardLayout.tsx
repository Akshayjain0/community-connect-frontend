import React from "react";

interface DashboardLayoutProps {
	left: React.ReactNode;
	middle: React.ReactNode;
	right: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
	left,
	middle,
	right,
}) => (
	<div className='flex flex-col h-[calc(100vh-64px)] gap-4 overflow-hidden'>
		<div className='flex flex-col lg:flex-row flex-1 gap-4 overflow-hidden'>
			<div className='flex-1 overflow-y-auto no-scrollbar'>{left}</div>
			<div className='flex-[2] overflow-y-auto no-scrollbar border-l border-r'>
				{middle}
			</div>
			<div className='w-full lg:w-1/3 overflow-y-auto no-scrollbar'>
				{right}
			</div>
		</div>
	</div>
);

export default DashboardLayout;
