const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Добро\sпожаловать\s:\)/);
});


test('has title 2', async ({ page }) => {
  await page.goto('/rules');

  await expect(page).toHaveTitle(/Правила/);
});

