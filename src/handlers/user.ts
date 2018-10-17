import {UserInterface, UserModel} from '../models/user';

export async function newUser(props: {
  username: string,
}): Promise<UserInterface> {
  const user = new UserModel({username: props.username});

  await user.save();

  return user;
}

export async function userByUsername(username: string): Promise<UserInterface> {
  const user = await UserModel.findOne({username});
  if (!user) {
    throw new Error(`User with username ${username} not found`);
  }
  return user;
}
