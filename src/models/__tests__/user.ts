import {UserModel} from '../user';

describe('UserModel', () => {
  it('can make a new instance', () => {
    const user = new UserModel();
    user.username = 'testusername';
  });
});
