import { expect, test } from "@playwright/test";

test("page title is correct", async ({ page }) => {
	await page.goto("/");
	await expect(page).toHaveTitle("The Croydon Chicken Mile");
});

test("hero heading is visible", async ({ page }) => {
	await page.goto("/");
	await expect(page.getByRole("heading", { level: 1 })).toContainText(
		"Croydon",
	);
});

test("nav links scroll to sections", async ({ page }) => {
	await page.goto("/");
	await page.getByRole("link", { name: "The Mile" }).click();
	await expect(page.getByRole("heading", { name: "The Mile", exact: true })).toBeInViewport();
});

test("restaurant cards are rendered", async ({ page }) => {
	await page.goto("/");
	const cards = page.locator("article.card");
	await expect(cards).toHaveCount(16);
});

test("mile definition appears in The Mile section", async ({ page }) => {
	await page.goto("/");
	await expect(page.locator(".mile-definition")).toContainText("BoxPark");
	await expect(page.locator(".mile-definition")).toContainText(
		"Croydon Tourist Board",
	);
});
