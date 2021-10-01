const express = require('express');
const mysql = require('mysql2/promise');
const mysqlConfig = require('./config.js');

const db = mysql.createPool(mysqlConfig);

const getProduct = (productId) => {
  return db.query(
    `SELECT
      p.id, p.name, p.slogan, p.description, c.category, s.original_price
    FROM
      product p
    INNER JOIN
      category c
    ON
      p.category_id = c.id
    INNER JOIN
      style s
    ON
      p.id = s.product_id
      and s.default_style = 1
    WHERE
      p.id = ${productId}`
  ).then(([[product]]) => {
    return db.query(
      `SELECT
          fn.feature, fv.value
        FROM
          product_feature pf
        INNER JOIN
          feature_name fn
        ON
          pf.feature_name = fn.id
        INNER JOIN
          feature_value fv
        ON
          pf.feature_value = fv.id
        WHERE
          pf.product_id = ${productId}`
    ).then(([productFeatures]) => {
      product.features = productFeatures;
      return product
    })
  })
};

const getRelated = (productIdsArray) => {
  let idString = '';

  productIdsArray.forEach((id, i, arr) => {
    idString += id;
    if (i < arr.length - 1) {
      idString += ','
    }
  });

  return db.query(
    `SELECT
      p.id,
      max(p.name) AS name,
      max(c.category) AS category,
      max(s.original_price) AS original_price,
      max(s.sale_price) AS sale_price,
      max(ph.thumbnail_url) AS thumbnail_url
    FROM
      product p
    LEFT JOIN
      category c
    ON
      p.category_id = c.id
    LEFT JOIN
      style s
    ON
      p.id = s.product_id
      and s.default_style = 1
    LEFT JOIN
      photos ph
    ON
      s.id = ph.style_id
    WHERE
      p.id
    IN
    (${idString})
    GROUP BY
      p.id`
  ).then(([productsDetails]) => {
    return productsDetails;
  })
};

const getStyles = (productId) => {
  return styleDetails = db.query(
    `SELECT DISTINCT
      s.default_style AS 'default?',
      c.colorway AS name,
      s.original_price,
      s.sale_price,
      s.id AS style_id
    FROM
      style s
    JOIN
      colorway c
    ON
      s.colorway_id = c.id
    WHERE
      s.product_id=${productId}
    `
  );
};

const addPhotos = (styles) => {
  let styleIds = '';
  styles.forEach((style, i, arr) => {
    styleIds += style.style_id;
    if (i < arr.length - 1) {
      styleIds += ','
    }
  });

  return db.query(
    `SELECT
      url, thumbnail_url, style_id
    FROM
      photos ph
    WHERE
      style_id
    IN
      (${styleIds})`
  ).then(([allStylePhotos]) => {
    styles.forEach(style => {
      const photos = [];
      allStylePhotos.forEach(photoSet => {
        if (style.style_id === photoSet.style_id) {
          delete photoSet.style_id;
          photos.push(photoSet)
        }
      })
      style.photos = photos;
    })
   return [styles, styleIds];
  })
};


const addSkus = (styles) => {
  const styleIds = styles.splice(1);

  return db.query(
    `SELECT
      sku.style_id, sku.id AS sku, size.size, sku.quantity
    FROM
      sku
    LEFT JOIN
      size
    ON
      sku.size_id = size.id
    WHERE
      sku.style_id
    IN
      (${styleIds})`
  ).then(([allSkus]) => {
    console.log('STYLES IN DB ========== ', styles[0]);
    console.log('ALL SKUSSS ================== ', allSkus);
    styles[0].forEach(style => {
      style.skus = {}
      allSkus.forEach(sku => {
        if (style.style_id === sku.style_id) {
          let skuId = sku.sku
          delete sku.style_id;
          delete sku.sku;
          style.skus[skuId] = sku
        }
      })
    });
    console.log('STYLES AFTER ITERATIONS ========= ', styles);
    return styles;
  })

}

module.exports = {
  db,
  getProduct,
  getStyles,
  getRelated,
  addPhotos,
  addSkus
};
