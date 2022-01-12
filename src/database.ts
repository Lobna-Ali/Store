import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();


const client = new Pool({
    "database": "Store",
    "host": "localhost",
    "user": "postgres",
    "password": "postgres"
});

export default client
