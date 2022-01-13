import client from "../database";

export type OrderDetails = {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
};

export class OrderDetailsModel {
    /**
     * get the order details for a certain order
     * @param {number} order_id 
     * @returns Promise<OrderDetails>
     */
    async show(order_id: number): Promise<OrderDetails> {
        try {
            const connection = await client.connect();
            const sql = "SELECT * FROM orderDetils WHERE order_id=($1)";
            const result = await connection.query(sql, [order_id]);
            connection.release();
            return result.rows;
        } catch (error) {
            throw new Error(
                `Something went wrong while getting certain product with error: ${error}`
            );
        }
    }
}