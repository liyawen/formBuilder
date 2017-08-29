const express = require('express');
const path = require('path');
const api = require('./src/server/routes/api');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/index.html`));
});

app.use('/api', api);

app.listen(3000, () => {
  console.log('app listen 3000');
});
