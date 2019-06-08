DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL (10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("12 pairs of crew socks", "Clothing", 13.99, 50),
		("Fire TV Stick with Alexa Voice Remote", "Electronics", 34.99, 75),
		("Quick Dry Towels", "Bath", 10.99, 150),
		("UNO CARD GAME", "Board Games", 5.44, 80),
		("Hand Soap Lemon Verbena 12.5 fl oz", "Cleaning", 5.19, 92),
		("Nintendo Switch", "Gaming", 299.00, 25),
		("Only for rich book: The most expensive book", "Books", 2999.99, 1),
		("103 Amazing Facts About the Black Indian of the Western Hemisphere", "Books", 250000.00, 1),
		("Steam Iron", "Home & Kitchen", 23.97, 123),
		("Dog Back Seat Cover", "Pets", 29.96, 78);