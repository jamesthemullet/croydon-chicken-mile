import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
});

test("page title is set", async ({ page }) => {
	await expect(page).toHaveTitle("The Croydon Chicken Mile");
});

test("meta description is set", async ({ page }) => {
	const description = page.locator('meta[name="description"]');
	await expect(description).toHaveAttribute("content", /fried chicken/i);
});

test("canonical URL points to production domain", async ({ page }) => {
	const canonical = page.locator('link[rel="canonical"]');
	await expect(canonical).toHaveAttribute(
		"href",
		"https://croydonchickenmile.co.uk/",
	);
});

test("Open Graph title matches page title", async ({ page }) => {
	const ogTitle = page.locator('meta[property="og:title"]');
	await expect(ogTitle).toHaveAttribute("content", "The Croydon Chicken Mile");
});

test("Open Graph description is set", async ({ page }) => {
	const ogDesc = page.locator('meta[property="og:description"]');
	await expect(ogDesc).toHaveAttribute("content", /.+/);
});

test("Open Graph image points to the welcome image", async ({ page }) => {
	const ogImage = page.locator('meta[property="og:image"]');
	await expect(ogImage).toHaveAttribute(
		"content",
		/welcome-to-croydon-chicken-mile\.png$/,
	);
});

test("Open Graph locale is en_GB", async ({ page }) => {
	const ogLocale = page.locator('meta[property="og:locale"]');
	await expect(ogLocale).toHaveAttribute("content", "en_GB");
});

test("Twitter card meta tags are set", async ({ page }) => {
	await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
		"content",
		"summary_large_image",
	);
	await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
		"content",
		"The Croydon Chicken Mile",
	);
});

test("JSON-LD structured data is present and valid", async ({ page }) => {
	const jsonLd = page.locator('script[type="application/ld+json"]');
	await expect(jsonLd).toHaveCount(1);

	const raw = await jsonLd.textContent();
	const parsed = JSON.parse(raw ?? "{}");

	expect(parsed["@type"]).toBe("ItemList");
	expect(parsed.itemListElement).toHaveLength(16);
	expect(parsed.itemListElement[0]["@type"]).toBe("ListItem");
	expect(parsed.itemListElement[0].item["@type"]).toBe("FoodEstablishment");
});
