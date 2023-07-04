require('dotenv').config();

let express = require('express');
let app = express();

console.log('Hello World');

const usePublicAssets = () => express.static(__dirname + '/public');

function requestLogger(req, _, next) {
  const { method, path, ip } = req;
  console.log({ method, path, ip });
  console.log(`${method} ${path} - ${ip}`);
  next();
}

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

function applyTimestamp(req, _, next) {
  const currentTime = new Date().toString();
  req.time = currentTime;
  next();
}

function serveTimestamp(req, _, next) {
  res.json({ time: req.time });
  next();
}

app.use('/public', usePublicAssets());
app.use('/', requestLogger);
app.get('/', serveHomePage);
app.get('/json', serveJsonHello);
app.get('/now', applyTimestamp, logTimestamp);

module.exports = app;
