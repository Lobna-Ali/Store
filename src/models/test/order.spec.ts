import { OrderModel } from '../order';

const orderModel = new OrderModel()

describe("orderModel Model", () => {

    it('should have an show method', () => {
        expect(orderModel.show).toBeDefined();
    });

    it('show method should get order by id', async () => {
        const result = await orderModel.show(1);
        expect(result).toBeUndefined();
    });
})