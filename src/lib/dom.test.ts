import { describe, expect, it } from "vitest";
import { getChild, getEl } from "./dom";

describe("getEl", () => {
	it("returns the element when found", () => {
		const el = {} as Element;
		const root = { getElementById: () => el };
		expect(getEl("some-id", root)).toBe(el);
	});

	it("throws a clear error when the element is missing", () => {
		const root = { getElementById: () => null };
		expect(() => getEl("missing-id", root)).toThrow(
			'Expected element with id "missing-id" to exist in the DOM',
		);
	});
});

describe("getChild", () => {
	it("returns the matched descendant when found", () => {
		const el = {} as Element;
		const parent = { querySelector: () => el } as unknown as ParentNode;
		expect(getChild(parent, ".some-class")).toBe(el);
	});

	it("throws a clear error when no descendant matches", () => {
		const parent = { querySelector: () => null } as unknown as ParentNode;
		expect(() => getChild(parent, ".missing")).toThrow(
			'Expected element matching ".missing" to exist in the DOM',
		);
	});
});
