import express, { Request, Response } from "express";

import jwt from "jsonwebtoken";
import { getUserOrder } from "./order";
export const router = express.Router();

/**
 * get User orders from DB
 * @param {string} routePath
 * @param {callback} Callbackfn call back function holds the req: {express.Request} , res: {express.Response}
 * @returns void
 */
router.get("/order/:user_id", async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const token = req.headers["authorization"];
    const jwtDetails = await jwt.verify(token, "XYZ", function (err, decoded) {
      return {
        err,
        decoded,
      };
    });

    if (jwtDetails.err) {
      return res
        .status(401)
        .send({ errorMessage: "Please provide a valid token" });
    }
    const order = await getUserOrder(user_id);

    return res.status(200).send({ ...order });
  } catch (err) {
    return res
      .status(500)
      .json({ errorMessage: "Something went wrong, Please try again later." });
  }
});
