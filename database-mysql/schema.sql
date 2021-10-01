CREATE DATABASE IF NOT EXISTS atelier_product_overview;

USE atelier_product_overview;

CREATE TABLE IF NOT EXISTS category (
  id int(11) AUTO_INCREMENT primary key,
  category varchar(255)
);

CREATE TABLE IF NOT EXISTS product (
  id int(11) AUTO_INCREMENT primary key,
  category_id int(11),
  name varchar(255),
  slogan varchar(560),
  description varchar(1120),
  FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE IF NOT EXISTS feature_name (
  id int(11) AUTO_INCREMENT primary key,
  feature_name varchar(255)
);

CREATE TABLE IF NOT EXISTS feature_value (
  id int(11) AUTO_INCREMENT primary key,
  feature_value varchar(255)
);

CREATE TABLE IF NOT EXISTS product_feature (
  id int(11) AUTO_INCREMENT primary key,
  product_id int(11),
  feature_name int(11),
  feature_value int(11),
  FOREIGN KEY (product_id) REFERENCES product(id),
  FOREIGN KEY (feature_name) REFERENCES feature_name(id),
  FOREIGN KEY (feature_value) REFERENCES feature_value(id)
);

CREATE TABLE IF NOT EXISTS colorway (
  id int(11) AUTO_INCREMENT primary key,
  name varchar(52)
);

CREATE TABLE IF NOT EXISTS style (
  id int(11) AUTO_INCREMENT primary key,
  product_id int(11),
  colorway_id int(11),
  sale_price DECIMAL(10, 2),
  original_price DECIMAL(10, 2),
  default_style tinyint,
  FOREIGN KEY (product_id) REFERENCES product(id),
  FOREIGN KEY (colorway_id) REFERENCES colorway(id)
);

CREATE TABLE IF NOT EXISTS size (
  id int(11) AUTO_INCREMENT primary key,
  size varchar(25)
);

CREATE TABLE IF NOT EXISTS sku (
  id int(11) AUTO_INCREMENT primary key,
  style_id int(11),
  size_id int(11),
  quantity int(11),
  FOREIGN KEY (style_id) REFERENCES style(id),
  FOREIGN KEY (size_id) REFERENCES size(id)
);

CREATE TABLE IF NOT EXISTS photos (
  id int(11) AUTO_INCREMENT primary key,
  style_id int(11),
  url varchar(255),
  thumbnail_url varchar(255),
  FOREIGN KEY (style_id) REFERENCES style(id)
);

CREATE TABLE IF NOT EXISTS temp_product (
  id int,
  name varchar(255),
  slogan varchar(560),
  description varchar(1120),
  category varchar(255),
  default_price decimal(10,2)
);

CREATE TABLE IF NOT EXISTS temp_product_features (
  id int,
  product_id int,
  feature varchar(55),
  value varchar(55)
);

CREATE TABLE IF NOT EXISTS temp_photos (
  id int,
  styleId int,
  url varchar(255),
  thumbnail_url varchar(255)
);

CREATE TABLE IF NOT EXISTS temp_sku (
  id int,
  styleId int,
  size varchar(10),
  quantity int
);

CREATE TABLE IF NOT EXISTS temp_styles (
  id int,
  productId int,
  name varchar(55),
  sale_price decimal(10,2),
  original_price decimal(10,2),
  default_style tinyint
);

LOAD DATA LOCAL INFILE
'/Users/cmonteilh/Desktop/hackreactor/atelier-sdc/product-overview-api/sdc_data/product.csv'
INTO TABLE temp_product
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n';

LOAD DATA LOCAL INFILE
'/Users/cmonteilh/Desktop/hackreactor/atelier-sdc/product-overview-api/sdc_data/features.csv'
INTO TABLE temp_product_features
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n';

LOAD DATA LOCAL INFILE
'/Users/cmonteilh/Desktop/hackreactor/atelier-sdc/product-overview-api/sdc_data/photos.csv'
INTO TABLE temp_photos
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n';

LOAD DATA LOCAL INFILE
'/Users/cmonteilh/Desktop/hackreactor/atelier-sdc/product-overview-api/sdc_data/skus.csv'
INTO TABLE temp_sku
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n';

LOAD DATA LOCAL INFILE
'/Users/cmonteilh/Desktop/hackreactor/atelier-sdc/product-overview-api/sdc_data/styles.csv'
INTO TABLE temp_styles
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n';


/*head -n 5 (csv file name)*/
