/* Replace with your SQL commands */
ALTER TABLE orderDetails ADD COLUMN order_id INTEGER NOT NULL REFERENCES orders(id), 
ADD COLUMN product_id INTEGER NOT NULL REFERENCES product(id);