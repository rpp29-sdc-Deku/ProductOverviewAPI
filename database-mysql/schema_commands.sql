USE atelier_product_overview;

INSERT INTO category(name) select distinct category from temp_product;

INSERT INTO product(name, slogan, category_name, description) select name, slogan, category_name, description from temp_product where id = 1;

UPDATE product p JOIN category c ON p.category_name = c.name SET p.category_id = c.id;