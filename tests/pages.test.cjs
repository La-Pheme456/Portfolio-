const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const root = path.resolve(__dirname, '..');
test('every portfolio page has a title, a main region and one primary heading', () => {
  for (const file of fs.readdirSync(root).filter(file => file.endsWith('.html'))) {
    const doc = new JSDOM(fs.readFileSync(path.join(root, file), 'utf8')).window.document;
    assert.ok(doc.title.trim(), file);
    assert.equal(doc.querySelectorAll('main').length, 1, file);
    assert.equal(doc.querySelectorAll('h1').length, 1, file);
  }
});
