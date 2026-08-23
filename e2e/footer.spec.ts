import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
});

test("footer contact email link is present with correct href", async ({
	page,
}) => {
	const link = page.locator('footer a[href^="mailto:"]');
	await expect(link).toBeVisible();
	await expect(link).toHaveAttribute(
		"href",
		"mailto:deepfried@croydonchickenmile.co.uk?subject=Fried%20Chicken%20Is%20Better%20Than%20Sex",
	);
});

test("missed a chicken shop link points to the contact email", async ({
	page,
}) => {
	const link = page.locator('.missed-a-shop a');
	await expect(link).toBeVisible();
	await expect(link).toHaveAttribute("href", /mailto:deepfried@croydonchickenmile\.co\.uk/);
});

test("footer disclaimer mentions vegan chicken", async ({ page }) => {
	await expect(page.locator("footer")).toContainText("chick'n");
});

test("footer shows site title", async ({ page }) => {
	await expect(
		page.locator("footer .footer-title"),
	).toContainText("Croydon Chicken Mile");
});
