let express = require('express');
let app = express();

console.log('Hello World');

function helloExpress(_, res) {
  res.send('Hello Express');
}

app.get('/', helloExpress);

module.exports = app;
