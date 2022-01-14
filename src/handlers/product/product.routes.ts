import express, { Request, Response } from "express";
import {
  createProduct,
  getAllProducts,
  getProductByName,
  getProductById,
} from "./product";
import { verifyToken } from "../../authentication/authentication";
export const router = express.Router();

/**
 * Creat User
 * @param {string} routePath
 * @param {callback} Callbackfn call back function holds the req: {express.Request} , res: {express.Response}
 * @returns void
 */
router.post("/new/product", async (req: Request, res: Response) => {
  try {
    const { name, price, category } = req.body;
    const token = req.headers["authorization"];
    if (!name) {
      return res
        .status(400)
        .send({ errorMessage: "Product name is not provided" });
    }

    const jwtDetails = await verifyToken(token);

    if (jwtDetails.err) {
      return res
        .status(401)
        .send({ errorMessage: "Please provide a valid token" });
    }

    const existingproduct = await getProductByName(name);
    if (existingproduct) {
      return res.status(400).send({ errorMessage: "Product Already Exist." });
    }


    const newProduct = await createProduct({ name, price, category });
    return res.status(200).json({ ...newProduct });
  } catch (err) {
    return res
      .status(500)
      .json({ errorMessage: "Something went wrong, Please try again later." });
  }
});
/**
 * get product from DB
 * @param {string} routePath
 * @param {callback} Callbackfn call back function holds the req: {express.Request} , res: {express.Response}
 * @returns void
 */
router.get("/product/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);

    return res.status(200).send({ ...product });
  } catch (err) {
    return res
      .status(500)
      .json({ errorMessage: "Something went wrong, Please try again later." });
  }
});
/**
 * get All product from DB
 * @param {string} routePath
 * @param {callback} Callbackfn call back function holds the req: {express.Request} , res: {express.Response}
 * @returns void
 */
router.get("/products", async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();

    return res.status(200).send(products);
  } catch (err) {
    return res
      .status(500)
      .json({ errorMessage: "Something went wrong, Please try again later." });
  }
});
