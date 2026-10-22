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

test("share button is visible", async ({ page }) => {
	await expect(page.locator("#share-btn")).toBeVisible();
	await expect(page.locator("#share-btn")).toContainText("Share this shop");
});

test("uses the Web Share API when available", async ({ page }) => {
	await page.evaluate(() => {
		(window as typeof window & { __shareCalls: unknown[] }).__shareCalls =
			[];
		navigator.share = (data?: ShareData) => {
			(
				window as typeof window & { __shareCalls: unknown[] }
			).__shareCalls.push(data);
			return Promise.resolve();
		};
	});

	await page.locator("#share-btn").click();

	const calls = await page.evaluate(
		() =>
			(window as typeof window & { __shareCalls: ShareData[] })
				.__shareCalls,
	);
	expect(calls).toHaveLength(1);
	expect(calls[0]?.title).toContain("Sam's");
	expect(calls[0]?.url).toContain("/chicken-shop/sams/");
});

test("falls back to copying the link when the Web Share API is unavailable", async ({
	page,
	context,
}) => {
	await context.grantPermissions(["clipboard-read", "clipboard-write"]);
	await page.evaluate(() => {
		Reflect.deleteProperty(navigator, "share");
	});

	await page.locator("#share-btn").click();

	await expect(page.locator("#share-feedback")).toBeVisible();
	await expect(page.locator("#share-feedback")).toContainText(
		"Link copied",
	);
	const clipboardText = await page.evaluate(() =>
		navigator.clipboard.readText(),
	);
	expect(clipboardText).toContain("/chicken-shop/sams/");
});
