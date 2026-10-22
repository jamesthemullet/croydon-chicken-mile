import { describe, expect, it } from "vitest";
import { buildShareData } from "./share";

describe("buildShareData", () => {
	it("builds a title, text and url for sharing", () => {
		expect(
			buildShareData(
				"Sam's",
				"Chicken so good it's basically a civic duty",
				"https://croydonchickenmile.co.uk/chicken-shop/sams/",
			),
		).toEqual({
			title: "Sam's — Croydon Chicken Mile",
			text: "\"Chicken so good it's basically a civic duty\" — check out Sam's on the Croydon Chicken Mile.",
			url: "https://croydonchickenmile.co.uk/chicken-shop/sams/",
		});
	});

	it("passes the url through unchanged", () => {
		const { url } = buildShareData(
			"Rap's",
			"Boxpark royalty",
			"https://example.com/x",
		);
		expect(url).toBe("https://example.com/x");
	});
});
