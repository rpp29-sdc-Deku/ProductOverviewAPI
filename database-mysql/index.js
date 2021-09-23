const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const db = mysql.createConnection(mysqlConfig);

db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Successfully connected to atelier_product_overview MySQL Database');
  }
})

module.exports = db;