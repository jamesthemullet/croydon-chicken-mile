import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/chicken-shop/sams/");
});

test("shop page title includes the shop name", async ({ page }) => {
	await expect(page).toHaveTitle(/Sam's/);
});

test("shop name is rendered as the main heading", async ({ page }) => {
	await expect(page.locator("main h1")).toHaveText("Sam's");
});

test("badge is shown when the shop has one", async ({ page }) => {
	await expect(page.locator("main .badge")).toContainText("4am");
});

test("address links out to Maps", async ({ page }) => {
	const address = page.locator(".shop-address");
	await expect(address).toHaveAttribute("href", /google\.com\/maps/);
});

test("a link back to the homepage mile is present", async ({ page }) => {
	await expect(page.locator('a[href="/#the-mile"]').first()).toBeVisible();
});

test("a card on the homepage links through to its shop page", async ({
	page,
}) => {
	await page.goto("/");
	const link = page
		.locator("article.card")
		.filter({ hasText: "Popeyes" })
		.first()
		.locator(".card-name a");
	await expect(link).toHaveAttribute("href", "/chicken-shop/popeyes/");
	await link.click();
	await expect(page).toHaveURL(/\/chicken-shop\/popeyes\/?$/);
});
