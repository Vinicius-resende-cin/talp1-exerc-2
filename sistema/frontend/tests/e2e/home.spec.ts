import { test, expect } from '@playwright/test';

test('home page shows application title', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Student Management System' })).toBeVisible();
});
