import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await page.locator("#oracle-trigger").click();
});

test("opens the modal via the oracle trigger", async ({ page }) => {
	await expect(page.locator("#oracle-modal")).toBeVisible();
});

test("spinning disables the button and reveals a result", async ({ page }) => {
	const spinBtn = page.locator("#spin-btn");
	const resultCard = page.locator("#result-card");

	await expect(resultCard).toBeHidden();

	await spinBtn.click();
	await expect(spinBtn).toBeDisabled();

	await expect(resultCard).toBeVisible({ timeout: 10000 });
	await expect(spinBtn).toBeEnabled();
	await expect(page.locator("#result-name")).not.toBeEmpty();
	await expect(page.locator("#result-tagline")).not.toBeEmpty();
});

test("Escape key closes the modal", async ({ page }) => {
	await page.keyboard.press("Escape");
	await expect(page.locator("#oracle-modal")).toBeHidden();
});

test("clicking the backdrop closes the modal", async ({ page }) => {
	await page.locator("#oracle-modal").click({ position: { x: 5, y: 5 } });
	await expect(page.locator("#oracle-modal")).toBeHidden();
});
