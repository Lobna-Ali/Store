import { Pool } from "pg";
import process from "process";
import dotenv from "dotenv";
dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  ENV,
} = process.env;

const client = new Pool({
  database: ENV == 'dev' ? POSTGRES_DB : POSTGRES_TEST_DB,
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default client;
