import { createUser, getAllUsers, getUser } from "../../user/user";
import { UserModel } from "../../../models/user";

describe("User functions", () => {
  const userModel = new UserModel();
  beforeAll(async () => {
    await userModel.create({
      first_name: "default",
      last_name: "user",
      user_name: "default_user",
      password: "1234",
    });
  });
  it("should have getAllUsers method", () => {
    expect(getAllUsers).toBeDefined();
  });
  it("should return all users", async () => {
    const result = await getAllUsers();
    expect(result).toBeDefined();
  });

  it("should have getUser method", () => {
    expect(getUser).toBeDefined();
  });
  it("should return user if exist if not will return undefined", async () => {
    const result = await getUser("default_user");
    expect(result).toBeDefined();
  });

  it("should have createUser method", () => {
    expect(createUser).toBeDefined();
  });
  it("should return user after creation", async () => {
    const result = await createUser({
      first_name: "create",
      last_name: "test",
      password: "122344",
      user_name: "create_test",
    });
    expect(result).toBeDefined();
  });
});
