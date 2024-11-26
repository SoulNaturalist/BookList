const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(page).toHaveTitle(/Добро\sпожаловать\s:\)/);
});


test('has title 2', async ({ page }) => {
  await page.goto('http://localhost:3000/rules');

  await expect(page).toHaveTitle(/Правила/);
});

