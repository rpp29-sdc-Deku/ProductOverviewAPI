const express = require('express');
const bodyParser = require('body-parser');
const loader = require('../tests/loader.json');
const { getProduct, getStyles, getRelated, addPhotos, addSkus } = require('../database-mysql/index.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 9110;

app.get('/', (req, res) => {
  res.send('HELLO WORLD!');
});

// verification for loader-io
app.get('/loaderio-698701bb22a52bcf73beca1b2002d32e/', (req, res) => {
  res.status(200).send('loaderio-698701bb22a52bcf73beca1b2002d32e')
})

// test data for loader.io tests
app.get('/loaderio/', (req, res) => {
  res.json(loader);
})

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
    if (styles.length < 1) {
      return null
    } else {
      return addPhotos(styles)
    }
  }).then(styles => {
    if(!styles) {
      return [null]
    } else {
      return addSkus(styles)
    }
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
  const { productIds } = req.body;
  getRelated(productIds).then(([[relatedProductDetails], productFeatures]) => {
    relatedProductDetails.forEach(product => {
      const features = [];
      product.photos = [{thumbnail_url: product.photos}];
      productFeatures.forEach(feature => {
        if (product.id === feature.product_id) {
          delete feature.product_id;
          features.push(feature)
        }
      });
      product.features = features
    });
    res.send(relatedProductDetails);
  }).catch((err) => {
    res.status(404).send(err.message);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

module.export = {
  app
}
