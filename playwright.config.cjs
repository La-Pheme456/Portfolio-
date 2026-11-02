const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({ testDir: './tests/browser', use: { baseURL: 'http://127.0.0.1:4173', browserName: 'chromium', screenshot: 'only-on-failure', trace: 'retain-on-failure' }, webServer: { command: 'npm start', url: 'http://127.0.0.1:4173', reuseExistingServer: false }, reporter: 'list' });
