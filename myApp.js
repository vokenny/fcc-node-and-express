require('dotenv').config();

let express = require('express');
let app = express();

console.log('Hello World');

const usePublicAssets = () => express.static(__dirname + '/public');

function serveHomePage(_, res) {
  const absolutePathHome = __dirname + '/views/index.html';
  res.sendFile(absolutePathHome);
}

function serveJsonHello(_, res) {
  const helloMessage =
    process.env.MESSAGE_STYLE === 'uppercase' ? 'HELLO JSON' : 'Hello json';
  const messageBody = { message: helloMessage };

  res.json(messageBody);
}

app.use('/public', usePublicAssets());

app.get('/', serveHomePage);

// app.get('/json', serveJsonHello);
app.get('/json', (_, res) =>
  res.json({
    message:
      process.env.MESSAGE_STYLE === 'uppercase' ? 'HELLO JSON' : 'Hello json',
  })
);

module.exports = app;
