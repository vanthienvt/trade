import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const distPath = join(process.cwd(), 'dist');
const indexHtmlPath = join(distPath, 'index.html');

if (!existsSync(indexHtmlPath)) {
  console.error('❌ dist/index.html not found! Build may have failed.');
  process.exit(1);
}

const indexHtml = readFileSync(indexHtmlPath, 'utf-8');

// Check if script tag exists and has correct format
const scriptTagMatch = indexHtml.match(/<script[^>]*src=["']([^"']+)["'][^>]*>/);
const hasScript = !!scriptTagMatch;
const scriptSrc = scriptTagMatch ? scriptTagMatch[1] : '';

// Check if script points to assets (build output) not source file
const isBuilt = scriptSrc.includes('assets/') && (scriptSrc.includes('.js') || scriptSrc.match(/assets\/index\.[a-f0-9]+\.js/));
const hasAbsolutePath = scriptSrc.startsWith('/') && !scriptSrc.startsWith('//');

console.log('📦 Build Check:');
console.log('  ✅ index.html exists');
console.log('  ' + (hasScript ? '✅' : '❌') + ' Script tag found');
if (hasScript) {
  console.log('  Script src:', scriptSrc);
  console.log('  ' + (isBuilt ? '✅' : '⚠️') + ' Points to built file:', isBuilt);
  console.log('  ' + (hasAbsolutePath ? '⚠️' : '✅') + ' Path format:', hasAbsolutePath ? 'absolute (may need base path)' : 'relative/with base');
}

if (!hasScript) {
  console.error('\n❌ Script tag not found in index.html!');
  console.log('\nFirst 500 chars of index.html:');
  console.log(indexHtml.substring(0, 500));
  process.exit(1);
}

if (!isBuilt && scriptSrc.includes('index.tsx')) {
  console.error('\n❌ Script still points to source file (index.tsx)!');
  console.error('   Vite should have transformed this to assets/index.[hash].js');
  console.log('\nScript tag:', scriptTagMatch[0]);
  process.exit(1);
}

console.log('\n✅ Build looks good!');

