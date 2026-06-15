const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const targetObj = "const prompt = `Generate 5 realistic corporate companies";
// Actually I'll use regex.
code = code.replace(/const prompt = \\`Generate 5istic[\s\S]*?\\`;/, '');
// Or easier, let's match the exact text:
let idx = code.indexOf('const prompt = \\`Generate');
if (idx !== -1) {
    let endIdx = code.indexOf('\\`;', idx);
    let str = code.substring(idx, endIdx + 3);
    code = code.replace(str, 'const prompt = "Generate 5 realistic corporate companies located in the Dubai district: " + dName + ". For EACH of those companies, generate 6 realistic open job positions (unless it typically has fewer, but aim for 6).";');
}
fs.writeFileSync('server.ts', code);
