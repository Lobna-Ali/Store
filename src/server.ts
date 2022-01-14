import express from "express";
import process from "process";
import bodyParser from "body-parser";
import { router as userRouter } from "../src/handlers/user/user.routes";
const app = express();
const jsonParser = bodyParser.json();

const port = process.env.PORT || 3900;

app.listen(port, async () => {
  // eslint-disable-next-line no-console
  console.log("listening on port", port);
});

app.use("/api", jsonParser, userRouter);

export default app;
