const fs = require("fs");

const notFoundPage = fs.readFileSync('./out/404/index.html');
const textBuffer = Buffer.from(notFoundPage);

fs.writeFileSync('./functions_src/404.html.json', `{ \"pageNotFound\": \"${textBuffer.toString('base64')}\" }`);