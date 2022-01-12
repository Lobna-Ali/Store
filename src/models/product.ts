import client from "../database";

export type Product = {
    id: number;
    name: string;
    price?: number;
    category?: string;
};

export class ProductModel {

    async index(): Promise<Product[]> {
        try {
            const connection = await client.connect();
            const sql = "SELECT * FROM product";
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(
                `Something went wrong while getting all products with error: ${error}`
            );
        }
    }

    async show(id: number): Promise<Product> {
        try {
            const connection = await client.connect();
            const sql = "SELECT * FROM product WHERE id=($1)";
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Something went wrong while getting certain product with error: ${error}`
            );
        }
    }

    async create(name: string, price?: number, category?: string): Promise<Product> {
        try {
            const connection = await client.connect();
            const sql = "INSERT INTO product (name, price, category) VALUES($1, $2, $3) RETURNING *";
            const result = await connection.query(sql, [name, price, category]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Something went wrong while adding new product with error: ${error}`
            );
        }
    }
    
}