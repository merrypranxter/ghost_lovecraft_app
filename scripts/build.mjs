import { mkdir, cp, readFile, writeFile } from 'node:fs/promises';
await mkdir('dist/src', { recursive: true });
let html = await readFile('index.html', 'utf8');
html = html.replace('/src/main.js', './src/main.js');
await writeFile('dist/index.html', html);
await cp('src', 'dist/src', { recursive: true });
console.log('Built static app into dist/');
