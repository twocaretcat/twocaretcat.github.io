import { expect, test } from '@playwright/test';

test('loads the homepage without browser errors', async ({ page }) => {
	const browserErrors: string[] = [];

	page.on('console', (message) => {
		if (message.type() === 'error') {
			browserErrors.push(message.text());
		}
	});
	page.on('pageerror', (error) => {
		browserErrors.push(error.message);
	});

	const response = await page.goto('/');

	expect(response?.ok()).toBe(true);

	await expect(page.locator('body')).toBeVisible();

	expect(browserErrors).toEqual([]);
});
