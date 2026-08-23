import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
});

test("map section heading and description are visible", async ({ page }) => {
	const section = page.locator("section").filter({ hasText: "Find the Mile" });
	await expect(section.getByRole("heading", { name: "Find the Mile" })).toBeVisible();
	await expect(section.locator(".map-definition")).toContainText("BoxPark");
});

test("map container is present in the DOM", async ({ page }) => {
	await expect(page.locator("#chicken-map")).toBeAttached();
});

async function scrollMapIntoView(page: import("@playwright/test").Page) {
	// page.mouse.wheel triggers real IntersectionObserver events in headless Chromium
	await page.mouse.wheel(0, 5000);
	await expect(page.locator("#chicken-map.leaflet-container")).toBeVisible({
		timeout: 8000,
	});
}

test("Leaflet initialises after the map scrolls into view", async ({ page }) => {
	await scrollMapIntoView(page);
});

test("map renders the correct number of markers", async ({ page }) => {
	await scrollMapIntoView(page);
	const markers = page.locator("#chicken-map .ccm-marker");
	await expect(markers).toHaveCount(16);
});

test("clicking a marker opens a popup with the restaurant name", async ({
	page,
}) => {
	await scrollMapIntoView(page);
	await page.locator("#chicken-map .ccm-marker").first().click();
	await expect(page.locator(".leaflet-popup-content")).toBeVisible();
	await expect(page.locator(".leaflet-popup-content strong")).not.toBeEmpty();
});
