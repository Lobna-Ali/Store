import { OrderDetailsModel } from '../orderDetails';

const orderDetailsModel = new OrderDetailsModel()

describe("OrderDetailsModel Model", () => {

    it('should have an show method', () => {
        expect(orderDetailsModel.show).toBeDefined();
    });

    it('show method should get orderDetails by id', async () => {
        const result = await orderDetailsModel.show(1);
        expect(result).toBeUndefined();
    });
})