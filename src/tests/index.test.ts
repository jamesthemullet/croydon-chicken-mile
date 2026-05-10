import { describe, expect, it } from "vitest";

// Logic extracted from index.astro mapMarkers derivation
const hasCoords = (r: { lat?: number; lng?: number }) =>
	Boolean(r.lat && r.lng);

const toMarker = (r: {
	name: string;
	address: string;
	lat: number;
	lng: number;
}) => ({ name: r.name, address: r.address, lat: r.lat, lng: r.lng });

describe("mapMarkers filter", () => {
	it("includes a restaurant with valid coords", () => {
		expect(hasCoords({ lat: 51.374, lng: -0.1 })).toBe(true);
	});

	it("excludes a restaurant with no lat", () => {
		expect(hasCoords({ lng: -0.1 })).toBe(false);
	});

	it("excludes a restaurant with no lng", () => {
		expect(hasCoords({ lat: 51.374 })).toBe(false);
	});

	it("excludes a restaurant with neither coord", () => {
		expect(hasCoords({})).toBe(false);
	});

	it("maps to the correct marker shape", () => {
		const r = {
			name: "Sam's",
			address: "46 High St",
			lat: 51.3722483,
			lng: -0.1005771,
		};
		expect(toMarker(r)).toEqual({
			name: "Sam's",
			address: "46 High St",
			lat: 51.3722483,
			lng: -0.1005771,
		});
	});
});
