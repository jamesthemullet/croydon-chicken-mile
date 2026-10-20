import { describe, expect, it } from "vitest";
import { computeTargetAngle, formatResultTagline } from "../lib/wheel";

describe("computeTargetAngle", () => {
	it("lands on the winning segment's center under the pointer", () => {
		const segmentCount = 16;
		const winnerIdx = 3;
		const arc = (2 * Math.PI) / segmentCount;
		const pointer = -Math.PI / 2;
		const segCenter = winnerIdx * arc + arc / 2;

		const target = computeTargetAngle(0, winnerIdx, segmentCount);

		const normalized = ((target % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
		const expected = (pointer - segCenter + 2 * Math.PI) % (2 * Math.PI);
		expect(normalized).toBeCloseTo(expected, 10);
	});

	it("always spins forward by at least 8 full rotations from the current angle", () => {
		const target = computeTargetAngle(5, 2, 16);
		expect(target).toBeGreaterThanOrEqual(5 + 8 * 2 * Math.PI);
		expect(target).toBeLessThan(5 + 9 * 2 * Math.PI);
	});

	it("produces a different target angle for a different winner", () => {
		const targetA = computeTargetAngle(0, 0, 16);
		const targetB = computeTargetAngle(0, 1, 16);
		expect(targetA).not.toBeCloseTo(targetB, 5);
	});
});

describe("formatResultTagline", () => {
	it("wraps the tagline in quotation marks", () => {
		expect(formatResultTagline("Hotter than your ex")).toBe(
			'"Hotter than your ex"',
		);
	});

	it("preserves apostrophes within the tagline", () => {
		expect(formatResultTagline("It's actually a really good pub")).toBe(
			'"It\'s actually a really good pub"',
		);
	});
});
