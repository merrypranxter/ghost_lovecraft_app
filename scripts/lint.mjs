import { readFile } from 'node:fs/promises';
for (const file of ['src/main.js','src/styles.css','index.html']) {
  const text = await readFile(file, 'utf8');
  if (text.includes('TODO')) throw new Error(`${file}: TODO found`);
  if (file.endsWith('.js') && /catch\s*\([^)]*\)\s*{\s*}\s*/.test(text)) throw new Error(`${file}: empty catch`);
}
console.log('Static lint checks passed');
