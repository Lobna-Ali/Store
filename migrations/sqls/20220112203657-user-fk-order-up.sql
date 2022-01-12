/* Replace with your SQL commands */
ALTER TABLE orders ADD COLUMN user_id INTEGER NOT NULL REFERENCES "user"(id);