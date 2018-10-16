import {Document, Model, model, Schema} from 'mongoose';

export interface UserInterface extends Document {
  username: string;
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

export const UserModel: Model<UserInterface> =
    model<UserInterface>('User', UserSchema);
