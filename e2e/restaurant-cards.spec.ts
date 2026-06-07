import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
});

test("each card displays a restaurant name", async ({ page }) => {
	const names = page.locator("article.card h3.card-name");
	await expect(names).toHaveCount(16);
	await expect(names.first()).not.toBeEmpty();
});

test("Sam's card shows the late-night badge", async ({ page }) => {
	const samsCard = page
		.locator("article.card")
		.filter({ hasText: "Sam's" })
		.first();
	await expect(samsCard.locator(".badge")).toContainText("4am");
});

test("cards without a badge do not render a badge element", async ({
	page,
}) => {
	const popeyes = page
		.locator("article.card")
		.filter({ hasText: "Popeyes" })
		.first();
	await expect(popeyes.locator(".badge")).toHaveCount(0);
});

test("each card shows an address", async ({ page }) => {
	const addresses = page.locator("article.card .card-address");
	const count = await addresses.count();
	for (let i = 0; i < count; i++) {
		await expect(addresses.nth(i)).not.toBeEmpty();
	}
});

test("cards with no image show the placeholder", async ({ page }) => {
	const davesCard = page
		.locator("article.card")
		.filter({ hasText: "Dave's Hot Chicken" })
		.first();
	await expect(davesCard.locator(".placeholder-img")).toBeVisible();
});

test("cards with an image render an img element", async ({ page }) => {
	const samsCard = page
		.locator("article.card")
		.filter({ hasText: "Sam's" })
		.first();
	await expect(samsCard.locator("img.card-img")).toBeVisible();
});
