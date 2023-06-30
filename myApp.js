let express = require('express');
let app = express();

console.log('Hello World');

function serveHomePage(_, res) {
  const absolutePathHome = __dirname + '/views/index.html';
  res.sendFile(absolutePathHome);
}

app.get('/', serveHomePage);

module.exports = app;
