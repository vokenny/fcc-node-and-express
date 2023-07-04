let express = require('express');
let app = express();

console.log('Hello World');

function serveHomePage(_, res) {
  const absolutePathHome = __dirname + '/views/index.html';
  res.sendFile(absolutePathHome);
}

const usePublicAssets = () => express.static(__dirname + '/public');

app.use('/public', usePublicAssets());
app.get('/', serveHomePage);

module.exports = app;
