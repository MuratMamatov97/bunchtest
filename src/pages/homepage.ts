import type { Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
constructor(page: Page) {
        this.page = page;
    }
    
async open() {
    await this.page.goto('https://help.bunch.capital/en');
    }
}