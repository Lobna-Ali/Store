import express from "express";
import process from "process";
import bodyParser from "body-parser";
import { router as userRouter } from "../src/handlers/user/user.routes";
import { router as productRouter } from "../src/handlers/product/product.routes";
import { router as orderRouter } from "../src/handlers/order/order.routes";
const app = express();
const jsonParser = bodyParser.json();

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  // eslint-disable-next-line no-console
  console.log("listening on port", port);
});

app.use("/api", jsonParser, userRouter);
app.use("/api", jsonParser, productRouter);
app.use("/api", jsonParser, orderRouter);

export default app;
