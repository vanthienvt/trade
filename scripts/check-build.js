import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const distPath = join(process.cwd(), 'dist');
const indexHtmlPath = join(distPath, 'index.html');

if (!existsSync(indexHtmlPath)) {
  console.error('❌ dist/index.html not found! Build may have failed.');
  process.exit(1);
}

const indexHtml = readFileSync(indexHtmlPath, 'utf-8');

// Check if base path is correctly injected
const hasBasePath = indexHtml.includes('base href') || indexHtml.includes('/assets/');
const hasScript = indexHtml.includes('index.tsx') || indexHtml.includes('assets/index');

console.log('📦 Build Check:');
console.log('  ✅ index.html exists');
console.log('  ' + (hasBasePath ? '✅' : '⚠️') + ' Base path detected:', hasBasePath);
console.log('  ' + (hasScript ? '✅' : '❌') + ' Script tag found:', hasScript);

if (!hasScript) {
  console.error('\n❌ Script tag not found in index.html!');
  console.log('\nFirst 500 chars of index.html:');
  console.log(indexHtml.substring(0, 500));
  process.exit(1);
}

console.log('\n✅ Build looks good!');

