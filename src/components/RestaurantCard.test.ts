import { describe, expect, it } from "vitest";

// Logic extracted from RestaurantCard.astro's card-address href
const buildMapsHref = (name: string, address: string) =>
	`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} ${address}`)}`;

describe("buildMapsHref", () => {
	it("encodes spaces in name and address", () => {
		expect(buildMapsHref("Rap's Boxpark", "1 High Street")).toBe(
			"https://www.google.com/maps/search/?api=1&query=Rap's%20Boxpark%201%20High%20Street",
		);
	});

	it("encodes apostrophes", () => {
		expect(buildMapsHref("Sam's", "46 High St")).toBe(
			"https://www.google.com/maps/search/?api=1&query=Sam's%2046%20High%20St",
		);
	});
});
