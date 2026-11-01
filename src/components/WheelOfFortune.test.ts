import { describe, expect, it, vi } from "vitest";
import {
	computeTargetAngle,
	drawWheel,
	formatResultTagline,
	pickWinnerIndex,
} from "../lib/wheel";

function createMockContext() {
	return {
		save: vi.fn(),
		restore: vi.fn(),
		beginPath: vi.fn(),
		closePath: vi.fn(),
		moveTo: vi.fn(),
		lineTo: vi.fn(),
		arc: vi.fn(),
		fill: vi.fn(),
		stroke: vi.fn(),
		clearRect: vi.fn(),
		translate: vi.fn(),
		rotate: vi.fn(),
		fillText: vi.fn(),
		fillStyle: "",
		strokeStyle: "",
		lineWidth: 0,
		shadowColor: "",
		shadowBlur: 0,
		font: "",
		textAlign: "",
		textBaseline: "",
	} as unknown as CanvasRenderingContext2D;
}

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

describe("pickWinnerIndex", () => {
	it("returns an index within range", () => {
		for (let i = 0; i < 20; i++) {
			const idx = pickWinnerIndex(16);
			expect(idx).toBeGreaterThanOrEqual(0);
			expect(idx).toBeLessThan(16);
		}
	});

	it("uses Math.random to pick the index", () => {
		const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0.5);
		expect(pickWinnerIndex(16)).toBe(8);
		randomSpy.mockRestore();
	});
});

describe("drawWheel", () => {
	it("clears the canvas and draws a segment per restaurant without throwing", () => {
		const ctx = createMockContext();
		const canvas = { width: 400, height: 400 };
		const restaurants = [
			{ name: "Sam's", tagline: "Hotter than your ex" },
			{ name: "Dave's Hot Chicken", tagline: "Famously spicy" },
		];

		expect(() => drawWheel(ctx, canvas, restaurants, 0)).not.toThrow();
		expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, 400, 400);
		expect(ctx.fillText).toHaveBeenCalled();
	});

	it("truncates long restaurant names when labeling segments", () => {
		const ctx = createMockContext();
		const canvas = { width: 400, height: 400 };
		const restaurants = [
			{ name: "A Very Long Restaurant Name That Overflows", tagline: "x" },
		];

		drawWheel(ctx, canvas, restaurants, 0);

		const labelCall = (
			ctx.fillText as ReturnType<typeof vi.fn>
		).mock.calls.find(
			(call) => typeof call[0] === "string" && call[0].endsWith("…"),
		);
		expect(labelCall?.[0]).toBe("A Very Long Rest…");
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
