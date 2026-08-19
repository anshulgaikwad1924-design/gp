const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('script.js', 'utf8');

// Get all IDs from index.html
const htmlIdsMatch = [...html.matchAll(/id=\"([^\"]+)\"/g)];
const htmlIds = new Set(htmlIdsMatch.map(m => m[1]));

// Also IDs generated in JS via template literals
const jsHtmlIdsMatch = [...js.matchAll(/id=\"([^\"]+)\"/g)];
jsHtmlIdsMatch.forEach(m => htmlIds.add(m[1]));

// Get all referenced IDs in JS
const getElementByIdMatch = [...js.matchAll(/getElementById\('([^']+)'\)/g)];
const referencedIds = new Set(getElementByIdMatch.map(m => m[1]));

const missing = [];
for (let id of referencedIds) {
  if (!htmlIds.has(id)) {
    missing.push(id);
  }
}

if (missing.length > 0) {
  console.log('Missing IDs referenced by getElementById:', missing);
} else {
  console.log('No missing IDs found for getElementById.');
}
