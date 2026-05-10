import { describe, expect, it } from "vitest";

// Logic extracted from RestaurantCard.astro frontmatter
const makeDrumsticks = (rating: number) =>
	Array.from({ length: 5 }, (_, i) => i < rating);

describe("RestaurantCard drumstick rating logic", () => {
	it("marks the correct number of drumsticks as filled", () => {
		expect(makeDrumsticks(3)).toEqual([true, true, true, false, false]);
	});

	it("handles a rating of 0", () => {
		expect(makeDrumsticks(0).every((d) => d === false)).toBe(true);
	});

	it("handles a perfect rating of 5", () => {
		expect(makeDrumsticks(5).every((d) => d === true)).toBe(true);
	});

	it("always returns exactly 5 items", () => {
		for (const rating of [0, 1, 2, 3, 4, 5]) {
			expect(makeDrumsticks(rating)).toHaveLength(5);
		}
	});

	it("rating of 1 fills only the first drumstick", () => {
		expect(makeDrumsticks(1)).toEqual([true, false, false, false, false]);
	});
});
