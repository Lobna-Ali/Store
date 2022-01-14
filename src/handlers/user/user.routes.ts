import express, { Request, Response } from "express";
import { getUser, createUser, getAllUsers } from "./user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const router = express.Router();

/**
 * Creat User
 * @param {string} routePath
 * @param {callback} Callbackfn call back function holds the req: {express.Request} , res: {express.Response}
 * @returns void
 */
router.post("/register/user", async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, password } = req.body;
    if (!(first_name && last_name && password)) {
      return res.status(400).send({ errorMessage: "Missing required inputs" });
    }
    const user_name = first_name + "_" + last_name;
    const existingUser = await getUser(user_name);
    if (existingUser) {
      return res.status(400).send({
        errorMessage:
          "User Already Exist. Please try With different credentials",
      });
    }
    const encryptedPass = await bcrypt.hash(password + "pepper", 14);
    const user = await createUser({
      first_name,
      last_name,
      user_name,
      password: encryptedPass,
    });
    const token = jwt.sign({ user_name: user.user_name }, "XYZ", {
      expiresIn: "2h",
    });
    delete user.password;
    return res.status(200).json({ ...user, token });
  } catch (err) {
    return res
      .status(500)
      .json({ errorMessage: "Something went wrong, Please try again later." });
  }
});

/**
 * Get User details
 * @param {string} routePath
 * @param {callback} Callbackfn call back function holds the req: {express.Request} , res: {express.Response}
 * @returns void
 */
router.get("/userDetails", async (req: Request, res: Response) => {
  try {
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
    const userAfterDecode = jwtDetails.decoded;
    const user = await getUser(userAfterDecode.user_name);
    delete user.password;
    return res.status(200).json({ ...user });
  } catch (err) {
    return res
      .status(500)
      .json({ errorMessage: "Something went wrong, Please try again later." });
  }
});

/**
 * Get All users
 * @param {string} routePath
 * @param {callback} Callbackfn call back function holds the req: {express.Request} , res: {express.Response}
 * @returns void
 */
router.get("/users", async (req: Request, res: Response) => {
  try {
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
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (err) {
    return res
      .status(500)
      .json({ errorMessage: "Something went wrong, Please try again later." });
  }
});
