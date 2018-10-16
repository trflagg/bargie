import {UserModel} from '../user';

describe('UserModel', () => {
  it('can make a new instance', () => {
    const user = new UserModel();
    user.username = 'testusername';
  });

  it('requires username', () => {
    const user = new UserModel();

    return user.validate().then(
        resolves => {
          throw new Error('test should not resolve');
        },
        error => {
          return expect(error.name).toEqual('ValidationError');
        });
  });
});
