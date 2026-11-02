const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jfif': 'image/jpeg', '.jpg': 'image/jpeg', '.webp': 'image/webp' };
http.createServer((req, res) => {
  let target;
  try { target = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname)); } catch { res.writeHead(400).end(); return; }
  if (!target.startsWith(root + path.sep) && target !== root) { res.writeHead(403).end(); return; }
  if (target === root) target = path.join(root, 'index.html');
  if (path.relative(root, target).split(path.sep).some(part => part.startsWith('.')) || !fs.existsSync(target) || !fs.statSync(target).isFile()) { res.writeHead(404).end(); return; }
  res.setHeader('Content-Type', mime[path.extname(target)] || 'application/octet-stream');
  fs.createReadStream(target).pipe(res);
}).listen(4173, '127.0.0.1', () => console.log('Preview: http://127.0.0.1:4173'));
