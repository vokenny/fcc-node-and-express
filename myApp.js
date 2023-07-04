require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

console.log('Hello World');

const useBodyParser = () => bodyParser.urlencoded({ extended: false });
const parseJsonPayloads = () => bodyParser.json();
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

function serveTimestamp(req, res) {
  res.json({ time: req.time });
}

function echoWord(req, res) {
  const { word } = req.params;
  res.json({ echo: word });
}

function serveName(req, res) {
  const { first, last } = req.query;
  res.json({ name: `${first} ${last}` });
}

app.use('/', requestLogger);
app.use('/', useBodyParser());
app.use('/', parseJsonPayloads());
app.use('/public', usePublicAssets());

app.get('/', serveHomePage);
app.get('/json', serveJsonHello);
app.get('/now', applyTimestamp, serveTimestamp);
app.get('/:word/echo', echoWord);
app.route('/name').get(serveName);

module.exports = app;
