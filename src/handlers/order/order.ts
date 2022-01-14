import { Order, OrderModel } from "../../models/order";

const orderModel = new OrderModel();

/**
 * get order for user
 * @param { number } user_id
 * @returns Promise<Product | null>
 */
export const getUserOrder = async (user_id: number): Promise<Order | null> => {
  try {
    const order = await orderModel.show(user_id);

    return order;
  } catch (error) {
    throw new Error(error);
  }
};
