import { User, UserModel } from '../user';

const userModel = new UserModel()

describe("User Model", () => {
  it('should have an index method', () => {
    expect(userModel.index).toBeDefined();
  });
  it('should have an index method', () => {
    expect(userModel.index).toBeDefined();
  });

  it('create method should add a new user', async () => {
    const result = await userModel.create({
      first_name: 'unit',
      last_name: 'test',
      user_name: 'unit_test',
      password: '1234'
    });
    expect(result).toEqual({
      id: 1,
      first_name: 'unit',
      last_name: 'test',
      user_name: 'unit_test',
      password: '1234'
    });
  });
});