import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
});

async function openWheel(page: import("@playwright/test").Page) {
	await page.locator("#oracle-trigger").click();
	await expect(page.locator("#oracle-modal")).toBeVisible();
}

test("opening the trigger shows the wheel modal", async ({ page }) => {
	await openWheel(page);
	await expect(page.locator("#wheel-canvas")).toBeVisible();
});

test("spinning the wheel disables the button and reveals a result", async ({
	page,
}) => {
	await openWheel(page);

	const spinBtn = page.locator("#spin-btn");
	const resultCard = page.locator("#result-card");

	await expect(resultCard).toBeHidden();
	await spinBtn.click();
	await expect(spinBtn).toBeDisabled();

	await expect(resultCard).toBeVisible({ timeout: 6000 });
	await expect(spinBtn).toBeEnabled();
	await expect(page.locator("#result-name")).not.toBeEmpty();
	await expect(page.locator("#result-tagline")).not.toBeEmpty();
});

test("Escape closes the modal and returns focus to the trigger", async ({
	page,
}) => {
	await openWheel(page);
	await page.keyboard.press("Escape");
	await expect(page.locator("#oracle-modal")).toBeHidden();
	await expect(page.locator("#oracle-trigger")).toBeFocused();
});

test("clicking the backdrop closes the modal", async ({ page }) => {
	await openWheel(page);
	await page.locator("#oracle-modal").click({ position: { x: 5, y: 5 } });
	await expect(page.locator("#oracle-modal")).toBeHidden();
});
