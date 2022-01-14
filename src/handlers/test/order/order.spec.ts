import { getUserOrder } from "../../order/order";

describe("Order functions", () => {
  it("should have getUserOrder method", () => {
    expect(getUserOrder).toBeDefined();
  });

  it("should return orders if exist if not will return undefined", async () => {
    const result = await getUserOrder(1);
    expect(result).toBeUndefined();
  });
});
