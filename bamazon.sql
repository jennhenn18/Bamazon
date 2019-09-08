DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT AUTO_INCREMENT,
    product_name VARCHAR(45) NULL,
    department_name VARCHAR(45) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('coffee maker', 'home and kitchen', 30.00, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('baking sheet', 'home and kitchen', 10.50, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('hiking boots', 'outdoor', 120.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('sleeping bag', 'outdoor', 200.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('winter coat', 'clothing', 80.75, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('gloves', 'clothing', 20.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('treats', 'pet supplies', 8.00, 23);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('collar', 'pet supplies', 10.00, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('tv', 'electronics', 100.00, 14);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('laptop', 'electronics', 1000.00, 60);