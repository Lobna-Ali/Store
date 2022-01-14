import { User, UserModel } from "../../models/user";

const userModel = new UserModel();

/**
 * get all users
 * @param { Response } res
 */
export const getAllUsers = async () => {
  try {
    const users = await userModel.index();

    return users;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * get all users
 * @param { Response } res
 */
export const getUser = async (user_name: string) => {
  try {
    const user = await userModel.show(user_name);

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * get all users
 * @param { Response } res
 */
export const createUser = async (user: User) => {
  try {
    const userCreated = await userModel.create(user);

    return userCreated;
  } catch (error) {
    throw new Error(error);
  }
};
