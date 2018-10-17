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
    console.log(JSON.stringify(user));
    expect(user).not.toBe(null);
    expect(user.username).toEqual('Tester');
  });
});
