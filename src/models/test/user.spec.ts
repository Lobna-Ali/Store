import { UserModel } from '../user';

const userModel = new UserModel()

describe("User Model", () => {

  beforeAll(async() => {
    await userModel.create({
      first_name: 'default',
      last_name: 'value',
      user_name: 'default_value',
      password: '1234'
    });
  })
  it('should have an index method', () => {
    expect(userModel.index).toBeDefined();
  });

  it('should have an create method', () => {
    expect(userModel.create).toBeDefined();
  });
  it('should have an show method', () => {
    expect(userModel.show).toBeDefined();
  });
  
  it('create method should add a new user', async () => {
    const result = await userModel.create({
      first_name: 'unit',
      last_name: 'test',
      user_name: 'unit_test',
      password: '1234'
    });
    expect(result).toEqual({
      id: 2,
      first_name: 'unit',
      last_name: 'test',
      user_name: 'unit_test',
      password: '1234'
    });
  });

  it('index method should get all user', async () => {
    const result = await userModel.index();
    expect(result.length).toBeDefined();
  });
  it('show method should get user by username', async () => {
    const result = await userModel.show('default_value');
    expect(result).toEqual({
      id: 1,
      first_name: 'default',
      last_name: 'value',
      user_name: 'default_value',
      password: '1234'
    });
  });
});