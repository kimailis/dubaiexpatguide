const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');
code = code.replace(
  'const scrapedText = .text().trim();',
  'const scrapedText = $("body").text().trim();'
);
fs.writeFileSync('server.ts', code);
