import client from "../database";

export type Order = {
  id: number;
  user_id: number;
  status: Status;
};

export enum Status {
  ACTIVE = "active",
  COMPLETE = "complete",
}

export class OrderModel {
  /**
   * get the order for a certain user
   * @param {number} user_id
   * @returns Promise<Order>
   */
  async show(user_id: number): Promise<Order> {
    try {
      const connection = await client.connect();
      const sql = "SELECT * FROM orders WHERE user_id=($1) AND status=($2)";
      const result = await connection.query(sql, [user_id, Status.ACTIVE]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Something went wrong while getting certain product with error: ${error}`
      );
    }
  }
}
