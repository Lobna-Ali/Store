import { OrderModel } from "../../../models/order";
import { getUserOrder } from "../../order/order";

describe("Order functions", () => {
    const oOrderModel = new OrderModel();
    it('should have getUserOrder method', () => {
        expect(getUserOrder).toBeDefined();
    });

    it('should return orders if exist if not will return undefined', async () => {
        const result = await getUserOrder(1);
        expect(result).toBeUndefined();
    });
})