import {connectToTestDB, disconnectToTestDB} from '../../../test/mongoose-utils.js';
import * as userHandler from '../user';

describe('UserHandler', () => {
  beforeAll(async () => {
    await connectToTestDB();
  });

  afterAll(async () => {
    await disconnectToTestDB();
  });

  it('can create a new user', async () => {
    expect.assertions(4);
    const user = await userHandler.newUser({
      username: 'Tester',
    });
    expect(user).not.toBe(null);
    expect(user.username).toEqual('Tester');
    const foundUser = await userHandler.userByUsername('Tester');
    expect(foundUser).not.toBe(null);
    expect(foundUser.username).toEqual('Tester');
  });

  it('throws error if user not found', async () => {
    await expect(userHandler.userByUsername('NotExist'))
        .rejects.toThrow('User with username NotExist not found');
  });
});
