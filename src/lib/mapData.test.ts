import { describe, expect, it } from "vitest";
import {
	DEFAULT_CENTER,
	DEFAULT_ZOOM,
	parseCenter,
	parseMarkers,
	parseZoom,
} from "./mapData";

describe("parseMarkers", () => {
	it("parses a valid markers array", () => {
		const json = JSON.stringify([
			{ name: "Sam's", address: "46 High St", lat: 51.37, lng: -0.1 },
		]);
		expect(parseMarkers(json)).toEqual([
			{ name: "Sam's", address: "46 High St", lat: 51.37, lng: -0.1 },
		]);
	});

	it("falls back to an empty array when the attribute is missing", () => {
		expect(parseMarkers(undefined)).toEqual([]);
	});

	it("falls back to an empty array on malformed JSON", () => {
		expect(parseMarkers("{not valid json")).toEqual([]);
	});

	it("falls back to an empty array when the JSON isn't an array", () => {
		expect(parseMarkers('{"name":"Sam\'s"}')).toEqual([]);
	});
});

describe("parseCenter", () => {
	it("parses a valid center tuple", () => {
		expect(parseCenter("[51.5,-0.12]")).toEqual([51.5, -0.12]);
	});

	it("falls back to the default center when the attribute is missing", () => {
		expect(parseCenter(undefined)).toEqual(DEFAULT_CENTER);
	});

	it("falls back to the default center on malformed JSON", () => {
		expect(parseCenter("not json")).toEqual(DEFAULT_CENTER);
	});

	it("falls back to the default center when the shape is wrong", () => {
		expect(parseCenter('["a","b"]')).toEqual(DEFAULT_CENTER);
		expect(parseCenter("[1,2,3]")).toEqual(DEFAULT_CENTER);
	});
});

describe("parseZoom", () => {
	it("parses a valid zoom value", () => {
		expect(parseZoom("12")).toBe(12);
	});

	it("falls back to the default zoom when the attribute is missing", () => {
		expect(parseZoom(undefined)).toBe(DEFAULT_ZOOM);
	});

	it("falls back to the default zoom on a non-numeric value", () => {
		expect(parseZoom("not-a-number")).toBe(DEFAULT_ZOOM);
	});
});
