const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mysql/index.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 9110;

app.get('/', (req, res) => {
  res.send('HELLO WORLD!');
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});