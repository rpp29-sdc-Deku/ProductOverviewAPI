const express = require('express');
const bodyParser = require('body-parser');
const { getProduct, getStyles, getRelated, addPhotos, addSkus } = require('../database-mysql/index.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 9110;

app.get('/', (req, res) => {
  res.send('HELLO WORLD!');
});

app.get('/products/:product_id', (req, res) => {
  const productId = req.params.product_id;
  getProduct(productId).then((results) => {
    res.send(results);
  }).catch((err) => {
    res.status(404).send(err.message);
  });
});

app.get('/products/:product_id/styles', (req, res) => {
  const productId = req.params.product_id;
  getStyles(productId).then(([styles]) => {
    return addPhotos(styles)
  }).then(styles => {
    return addSkus(styles)
  }).then(([completedStyles])  => {
    const productStyles = {
      product_id: productId,
      results: completedStyles
    }
    res.send(productStyles);
  })
  .catch((err) => {
    res.status(404).send(err.message);
  });
});

app.post('/related-products', (req, res) => {
  console.log('REQUEST PARAMS ====== ', req.body);
  const productId = [1, 2, 3, 4];
  getRelated(productId).then((results) => {
    res.send(results);
  }).catch((err) => {
    res.status(404).send(err.message);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
