let express = require('express');
let app = express();

console.log('Hello World');

const usePublicAssets = () => express.static(__dirname + '/public');

function serveHomePage(_, res) {
  const absolutePathHome = __dirname + '/views/index.html';
  res.sendFile(absolutePathHome);
}

function serveJsonHello(_, res) {
  const helloMessage = { message: 'Hello json' };
  res.json(helloMessage);
}

app.use('/public', usePublicAssets());
app.get('/', serveHomePage);
app.get('/json', serveJsonHello);

module.exports = app;
