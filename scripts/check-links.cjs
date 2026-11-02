const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const root = path.resolve(__dirname, '..');
let errors = 0;
for (const file of fs.readdirSync(root).filter(file => file.endsWith('.html'))) {
  const document = new JSDOM(fs.readFileSync(path.join(root, file), 'utf8')).window.document;
  for (const node of document.querySelectorAll('[href], [src]')) {
    const ref = node.getAttribute('href') ?? node.getAttribute('src');
    if (!ref || /^[a-z][a-z0-9+.-]*:/i.test(ref) || ref.startsWith('//') || ref === '#') continue;
    const url = new URL(ref, 'https://local.test/' + file);
    const target = path.join(root, decodeURIComponent(url.pathname));
    const fail = message => { console.error(file + ': ' + ref + ' — ' + message); errors++; };
    if (!fs.existsSync(target)) { fail('missing target'); continue; }
    if (target.endsWith('.html')) {
      const text = fs.readFileSync(target, 'utf8');
      if (!text.trim()) fail('empty page');
      if (url.hash) {
        const targetDoc = new JSDOM(text).window.document;
        if (!targetDoc.getElementById(decodeURIComponent(url.hash.slice(1)))) fail('missing anchor');
      }
    }
  }
}
if (errors) process.exitCode = 1;
else console.log('Local page, asset and fragment links passed.');
