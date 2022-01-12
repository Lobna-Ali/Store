import express from "express";
import process from "process";
import client  from "./database";
const app = express();
const port = process.env.PORT || 3900;


app.listen(port, async() => {
  // eslint-disable-next-line no-console

  console.log("listening on port", port);
  // const connection = await client.connect();
  // const sql = "CREATE TABLE products (id SERIAL PRIMARY KEY, name VARCHAR(100))";
  // const result = await connection.query(sql);
  // console.log(result)
  // connection.release();
});

export default app;
