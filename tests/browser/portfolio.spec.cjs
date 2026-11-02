const { test, expect } = require('@playwright/test');
test('About page works from navigation on desktop and mobile', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.locator('.nav-links').getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/about\.html$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('More than');
  await expect(page.locator('.nav-link[aria-current="page"]')).toHaveText('About');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.locator('.mobile-menu').getByRole('link', { name: 'Work', exact: true }).click();
  await expect(page).toHaveURL(/work\.html$/);
  expect(errors).toEqual([]);
});
test('reduced motion leaves content visible and stops decorative animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.ambient-light')).toBeHidden();
  await expect(page.locator('.hero-title')).toBeVisible();
  expect(await page.locator('.hero-title').evaluate(node => getComputedStyle(node).opacity)).toBe('1');
  await expect(page.locator('.loader')).toBeHidden();
  await page.goto('/work.html');
  await expect(page.locator('#ace-vouge .project-live-link')).toHaveAttribute('href', 'https://ace-vouge-website.vercel.app/');
  await page.locator('.project-card').first().hover();
  expect(await page.locator('.project-card').first().evaluate(node => node.style.transform)).toBe('');
});
test('mobile menu closes with Escape and restores the trigger', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/about.html');
  const button = page.locator('.menu-button');
  await button.focus();
  await page.keyboard.press('Enter');
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(button).toBeFocused();
  await expect(button).toHaveAttribute('aria-expanded', 'false');
});
