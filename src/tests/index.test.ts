import { describe, expect, it } from "vitest";
import { toMapMarkers } from "../lib/mapData";

describe("toMapMarkers", () => {
	it("includes a restaurant with valid coords", () => {
		const r = { name: "Sam's", address: "46 High St", lat: 51.374, lng: -0.1 };
		expect(toMapMarkers([r])).toEqual([r]);
	});

	it("excludes a restaurant with no lat", () => {
		const r = { name: "Sam's", address: "46 High St", lng: -0.1 };
		expect(toMapMarkers([r])).toEqual([]);
	});

	it("excludes a restaurant with no lng", () => {
		const r = { name: "Sam's", address: "46 High St", lat: 51.374 };
		expect(toMapMarkers([r])).toEqual([]);
	});

	it("excludes a restaurant with neither coord", () => {
		const r = { name: "Sam's", address: "46 High St" };
		expect(toMapMarkers([r])).toEqual([]);
	});

	it("maps to the correct marker shape, dropping extra fields", () => {
		const r = {
			name: "Sam's",
			address: "46 High St",
			lat: 51.3722483,
			lng: -0.1005771,
			tagline: "unused here",
			specialty: "Chicken",
			slug: "sams",
		};
		expect(toMapMarkers([r])).toEqual([
			{
				name: "Sam's",
				address: "46 High St",
				lat: 51.3722483,
				lng: -0.1005771,
			},
		]);
	});
});
