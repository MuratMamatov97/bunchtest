import { test, expect } from '@playwright/test';
import { correctSearchWord, incorrectSearchWord } from '../../utils/utils.json';
import { HomePage } from '../pages/homepage';

test.beforeEach(async ({ page }) => {
  const homepage = new HomePage(page);
  await homepage.open();
});

test('Verify that search function works correctly @search', async ({ page }) => {

  // Check with word from articles to assert there will be results
  await page.getByPlaceholder('Search for articles...').fill(correctSearchWord);
  // search-popup
  await expect(page.locator('xpath = //*[@id="search-bar"]/div[@data-testid="search-popup"]')).toBeVisible();
  await expect((await page.locator('xpath = //*[@id="search-bar"]/div[@data-testid="search-popup"]').allInnerTexts()).toString()).toContain(correctSearchWord);

  await page.getByPlaceholder('Search for articles...').press('Enter');

  await expect(page.locator('xpath = //section[@data-testid="main-content"]')).toBeVisible();
  // Assert that the results contain the word
  await expect((await page.locator('xpath = //div[@class="w-full"]').allInnerTexts()).toString()).toContain(correctSearchWord);

  // Check with another symbols to assert there will be no results
  await page.getByPlaceholder('Search for articles...').fill(incorrectSearchWord);

  await page.getByPlaceholder('Search for articles...').press('Enter');
  
  // Assert that there are no results which contain the word
  await expect((await page.locator('xpath = //section[@data-testid="main-content"]').allInnerTexts()).toString()).toContain('We couldn\'t find any articles for:' + incorrectSearchWord);

  // Assert the clear button works
  await expect(page.locator('xpath = //*[@aria-label="Clear search query"]')).toBeVisible();
  await page.locator('xpath = //*[@aria-label="Clear search query"]').click();
  await expect(page.getByPlaceholder('Search for articles...')).toHaveValue("");
  await expect(page.locator('xpath = //*[@aria-label="Clear search query"]')).toHaveCount(0);
});

test('Verify that Open Intercom Messenger works correctly @intercom', async ({ page }) => {
  // Click on intercom
  await page.getByLabel('Open Intercom Messenger').click();
  // Check that it's opened
  await expect(page.locator('xpath = //*[@class="intercom-app"]')).toBeAttached();
  await page.locator('xpath = //*[@name = "intercom-launcher-frame"]').click();
});

test('Verify that articles are opened with all the functions inside working @articles', async ({ page }) => {

  // Go to first articles theme "General"
  await page.locator('#general').click();

  await expect(await page.locator('#general')).toBeVisible();

  // Check articles
  await page.locator('xpath = (//*[@data-testid = "article-link"])[1]').click();

  await expect(await page.locator('xpath = //*[@data-testid = "main-content"]')).toBeVisible();

  // Check work of reactions
  await expect(await page.getByLabel('Disappointed Reaction').getAttribute('class')).toBe('intercom-reaction');

  await page.getByLabel('Disappointed Reaction').click();

  await expect(await page.getByLabel('Disappointed Reaction').getAttribute('class')).toBe('intercom-reaction intercom-reaction-selected');

  // Intercom helper checking
  await expect(page.getByTitle('Intercom live chat message')).toBeVisible();
});

