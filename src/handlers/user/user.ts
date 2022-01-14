import { User, UserModel } from "../../models/user";

const userModel = new UserModel();

/**
 * get all users by calling Model file
 * @returns Promise<User[] | null>
 */
export const getAllUsers = async (): Promise<User[] | null> => {
  try {
    const users = await userModel.index();

    return users;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * get certain user by calling Model file
 * @param { string } user_name
 * @returns Promise<User | null>
 */
export const getUser = async (user_name: string): Promise<User | null> => {
  try {
    const user = await userModel.show(user_name);

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * create new user by calling Model file
 * @param user
 * @returns Promise<User | null>
 */
export const createUser = async (user: User): Promise<User | null> => {
  try {
    const userCreated = await userModel.create(user);

    return userCreated;
  } catch (error) {
    throw new Error(error);
  }
};
