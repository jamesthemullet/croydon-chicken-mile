import { describe, expect, it } from "vitest";
import { restaurants, slugify } from "./restaurants";

describe("slugify", () => {
	it("lowercases and hyphenates spaces", () => {
		expect(slugify("Popeyes")).toBe("popeyes");
		expect(slugify("Chicken Valley Croydon")).toBe("chicken-valley-croydon");
	});

	it("strips apostrophes rather than turning them into hyphens", () => {
		expect(slugify("Sam's")).toBe("sams");
		expect(slugify("Rio's Piri Piri")).toBe("rios-piri-piri");
	});

	it("collapses non-alphanumeric runs and trims edge hyphens", () => {
		expect(slugify("Rooster King - Croydon")).toBe("rooster-king-croydon");
		expect(slugify("Poor Boys @ BoxPark")).toBe("poor-boys-boxpark");
	});
});

describe("restaurants data", () => {
	it("gives every restaurant a non-empty slug", () => {
		for (const r of restaurants) {
			expect(r.slug).toBeTruthy();
		}
	});

	it("has no duplicate slugs", () => {
		const slugs = restaurants.map((r) => r.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
	});
});
