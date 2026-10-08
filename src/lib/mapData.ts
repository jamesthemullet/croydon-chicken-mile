export interface MapMarker {
	name: string;
	address: string;
	lat: number;
	lng: number;
}

export const DEFAULT_CENTER: [number, number] = [51.3749, -0.0991];
export const DEFAULT_ZOOM = 15;

export function toMapMarkers<
	T extends { name: string; address: string; lat?: number; lng?: number },
>(restaurants: T[]): MapMarker[] {
	return restaurants
		.filter((r): r is T & { lat: number; lng: number } =>
			Boolean(r.lat && r.lng),
		)
		.map((r) => ({
			name: r.name,
			address: r.address,
			lat: r.lat,
			lng: r.lng,
		}));
}

export function parseMarkers(json: string | undefined): MapMarker[] {
	if (!json) return [];
	try {
		const parsed = JSON.parse(json);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}

export function parseCenter(json: string | undefined): [number, number] {
	if (!json) return DEFAULT_CENTER;
	try {
		const parsed = JSON.parse(json);
		if (
			Array.isArray(parsed) &&
			parsed.length === 2 &&
			parsed.every((n) => typeof n === "number")
		) {
			return parsed as [number, number];
		}
		return DEFAULT_CENTER;
	} catch {
		return DEFAULT_CENTER;
	}
}

export function parseZoom(value: string | undefined): number {
	if (!value) return DEFAULT_ZOOM;
	const parsed = Number.parseInt(value, 10);
	return Number.isNaN(parsed) ? DEFAULT_ZOOM : parsed;
}
