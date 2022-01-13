import client from "../database";

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
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
            const sql = "SELECT * FROM user";
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
     * @param { string } userName 
     * @param { string } password 
     * @returns Promise<User>
     */
    async show(userName: string, password: string): Promise<User> {
        try {
            const connection = await client.connect();
            const sql = "SELECT * FROM user WHERE userName=($1)";
            const result = await connection.query(sql, [userName]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Something went wrong while getting the user with error: ${error}`
            );
        }
    }
    /**
     * 
     * @param { User } user 
     */
    async create(user: User): Promise<User> {
        try {
            const connection = await client.connect();
            const sql = "INSERT INTO user (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *";
            const result = await connection.query(sql, [user.firstName, user.lastName, user.password, user.userName]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Something went wrong while adding new user with error: ${error}`
            );
        }
    }
    
}