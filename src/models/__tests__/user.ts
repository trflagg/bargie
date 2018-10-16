import {UserModel} from '../user';

describe('UserModel', () => {
  it('can make a new instance', () => {
    const user = new UserModel();
    user.username = 'testusername';
  });

  it('requires username', () => {
    const user = new UserModel();

    try {
      return user.validate().catch(error => {
        expect(error.name).toEqual('ValidationError');
      });
    } catch (e) {
      return null;
    }
  });
});
