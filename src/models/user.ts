import client from "../database";

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  user_name: string;
  password: string;
};

export class UserModel {
  /**
   * get all users
   * @returns Promise<User[]>
   */
  async index(): Promise<User[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM "user"';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Something went wrong while getting all users with error: ${error}`
      );
    }
  }

  /**
   * Get user by his user name and password
   * @param { string } user_name
   * @param { string } password
   * @returns Promise<User>
   */
  async show(user_name: string): Promise<User> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM "user" WHERE user_name=($1)';
      const result = await connection.query(sql, [user_name]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Something went wrong while getting the user with error: ${error}`
      );
    }
  }
  /**
   * create new user
   * @param { User } user
   * @returns Promise<User>
   */
  async create(user: User): Promise<User> {
    try {
      const connection = await client.connect();
      const sql =
        'INSERT INTO "user" (first_name, last_name, password, user_name) VALUES($1, $2, $3, $4) RETURNING *';
      const result = await connection.query(sql, [
        user.first_name,
        user.last_name,
        user.password,
        user.user_name,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Something went wrong while adding new user with error: ${error}`
      );
    }
  }
}
