// const VolunteerMiddle = () => {
// 	return <div></div>;
// };

// export default VolunteerMiddle;

import { useEffect, useState, useCallback } from "react";
// import CreateProjectModal from "@/components/CreateProjectModal";
import { useAuth } from "@/context/AuthContext";
import { getMyFeed } from "@/lib/api/project";
import ProjectCard from "@/components/ProjectCard";
import { DomainListType } from "@/types/volunteer/DomainListType";
import { getDomainList } from "@/lib/api/domain";
import { ProjectCardPropsTypes } from "@/types/projects/ProjectCardProps";

export default function OrganizerDashboard() {
	const { user, role, fullName } = useAuth();
	console.log(role);
	const [projects, setProjects] = useState<ProjectCardPropsTypes[]>([]);
	const [domains, setDomains] = useState<DomainListType[]>([]);

	const fetchProjects = useCallback(async () => {
		try {
			const res = await getMyFeed();
			setProjects(res.data.projects);
		} catch (err) {
			console.error("Error fetching projects", err);
		}
	}, []);

	const fetchDomains = useCallback(async () => {
		try {
			const res = await getDomainList();
			setDomains(res.data);
		} catch (err) {
			console.error("Error fetching domains", err);
		}
	}, []);

	useEffect(() => {
		fetchProjects();
		fetchDomains();
	}, [fetchProjects, fetchDomains]);

	return (
		<div>
			<div className='flex items-start justify-between mb-6'>
				<div>
					<h3 className='text-3xl font-medium'>
						Good Morning, {fullName} 👋🏻
					</h3>
				</div>
				{/* <CreateProjectModal onSuccess={fetchProjects} /> */}
			</div>

			{projects.length !== 0 ? (
				<div className='flex flex-col items-center gap-6'>
					{projects.map((project) => {
						const domain =
							domains.find((d) => d._id === project.domain_id)
								?.domain_name || "Unknown";
						const subdomains =
							domains
								.find((d) => d._id === project.domain_id)
								?.subdomains.filter((sub) =>
									project.subdomain_ids.includes(sub._id)
								)
								.map((sub) => sub.sub_domain_name) || [];

						return (
							<ProjectCard
								key={project._id}
								userName={
									project?.organizer_id?.organizer_name ||
									"Organizer"
								}
								userAvatarUrl={user?.logo || undefined}
								createdAt={project.created_at}
								title={project.title}
								description={project.description}
								state={project.state}
								city={project.city}
								locality={project.locality}
								time_commitment={project.time_commitment}
								domain={domain}
								subdomains={subdomains}
								role={role}
							/>
						);
					})}
				</div>
			) : (
				<p>No project found.</p>
			)}
		</div>
	);
}
