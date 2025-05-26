export type CreateProjectPayload = {
	title: string;
	description: string;
	state: string;
	city: string;
	locality: string;
	domain_id: string;
	subdomain_ids: string[];
	time_commitment: string;
};
