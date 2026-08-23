import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
});

test("about section heading is visible", async ({ page }) => {
	const section = page.getByRole("region", { name: "About" });
	await expect(section.getByRole("heading", { level: 2 })).toContainText(
		"Love Letter",
	);
});

test("stat shows 16 chicken shops", async ({ page }) => {
	const stat = page
		.locator(".stat")
		.filter({ hasText: "Chicken Shops" });
	await expect(stat.locator(".stat-number")).toHaveText("16");
});

test("stat count matches actual number of restaurant cards", async ({ page }) => {
	const statNumber = await page
		.locator(".stat")
		.filter({ hasText: "Chicken Shops" })
		.locator(".stat-number")
		.textContent();
	const cardCount = await page.locator("article.card").count();
	expect(Number(statNumber)).toBe(cardCount);
});

test("stat shows 1 glorious mile", async ({ page }) => {
	const stat = page.locator(".stat").filter({ hasText: "Glorious Mile" });
	await expect(stat.locator(".stat-number")).toHaveText("1");
});

test("stat shows zero regrets", async ({ page }) => {
	const stat = page.locator(".stat").filter({ hasText: "Regrets" });
	await expect(stat.locator(".stat-number")).toHaveText("0");
});

test("about section body copy mentions Croydon", async ({ page }) => {
	const section = page.getByRole("region", { name: "About" });
	await expect(section).toContainText("Croydon");
});
