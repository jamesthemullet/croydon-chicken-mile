import { describe, expect, it } from "vitest";
import { toMapMarkers } from "../lib/mapData";

describe("mapMarkers filter", () => {
	it("includes a restaurant with valid coords", () => {
		expect(
			toMapMarkers([
				{ name: "Sam's", address: "46 High St", lat: 51.374, lng: -0.1 },
			]),
		).toEqual([
			{ name: "Sam's", address: "46 High St", lat: 51.374, lng: -0.1 },
		]);
	});

	it("excludes a restaurant with no lat", () => {
		expect(
			toMapMarkers([{ name: "Sam's", address: "46 High St", lng: -0.1 }]),
		).toEqual([]);
	});

	it("excludes a restaurant with no lng", () => {
		expect(
			toMapMarkers([{ name: "Sam's", address: "46 High St", lat: 51.374 }]),
		).toEqual([]);
	});

	it("excludes a restaurant with neither coord", () => {
		expect(toMapMarkers([{ name: "Sam's", address: "46 High St" }])).toEqual(
			[],
		);
	});

	it("maps to the correct marker shape", () => {
		const r = {
			name: "Sam's",
			address: "46 High St",
			lat: 51.3722483,
			lng: -0.1005771,
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
