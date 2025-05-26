export interface ProjectCardProps {
	userName: string;
	userAvatarUrl?: string;
	createdAt: string;
	title: string;
	description: string;
	state: string;
	city: string;
	locality: string;
	time_commitment: string;
	domain: string;
	subdomains: string[];
	role: organizer | volunteer;
}

export interface ProjectCardPropsTypes {
	_id: string;
	userName: string;
	userAvatarUrl?: string;
	created_at: string;
	title: string;
	description: string;
	state: string;
	city: string;
	locality: string;
	time_commitment: string;
	domain_id: string;
	subdomain_ids: string[];
	organizer_id: {
		_id: string;
		organizer_name: string;
	};
}
