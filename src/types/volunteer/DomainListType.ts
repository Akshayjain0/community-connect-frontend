export interface DomainListType {
	_id: string;
	domain_name: string;
	subdomains: {
		_id: string;
		sub_domain_name: string;
	}[];
}

export interface MultiSelectOption {
	label: string;
	value: string;
	group?: string;
}
