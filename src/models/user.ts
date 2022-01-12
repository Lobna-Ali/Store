import client from "../database";

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
};

export class UserModel {

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

    async show(firstName: string, lastName: string, password: string): Promise<User> {
        try {
            const connection = await client.connect();
            const sql = "SELECT * FROM user WHERE firstName=($1) AND lastName = ($2)";
            const result = await connection.query(sql, [firstName, lastName]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Something went wrong while getting the user with error: ${error}`
            );
        }
    }

    async create(firstName: string, lastName: string, password: string): Promise<User> {
        try {
            const connection = await client.connect();
            const sql = "INSERT INTO user (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *";
            const result = await connection.query(sql, [firstName, lastName, password]);
            connection.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `Something went wrong while adding new user with error: ${error}`
            );
        }
    }
    
}