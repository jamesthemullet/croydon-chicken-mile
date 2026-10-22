export interface ShareData {
	title: string;
	text: string;
	url: string;
}

export function buildShareData(
	name: string,
	tagline: string,
	url: string,
): ShareData {
	return {
		title: `${name} — Croydon Chicken Mile`,
		text: `"${tagline}" — check out ${name} on the Croydon Chicken Mile.`,
		url,
	};
}
