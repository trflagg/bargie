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
    expect.assertions(2);
    const user = await userHandler.newUser({
      username: 'Tester',
    });
    expect(user).not.toBe(null);
    expect(user.username).toEqual('Tester');
  });

  it('can find a user by username', async () => {
    expect.assertions(2);
    const user = await userHandler.userByUsername('Tester');
    expect(user).not.toBe(null);
    expect(user.username).toEqual('Tester');
  });

  it('throws error if user not found', async () => {
    await expect(userHandler.userByUsername('NotExist'))
        .rejects.toThrow('User with username NotExist not found');
  });
});
