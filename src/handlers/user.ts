import {UserInterface, UserModel} from '../models/user';

export async function newUser(props: {
  username: string,
}): Promise<UserInterface> {
  const user = new UserModel({username: props.username});

  return user;
}
