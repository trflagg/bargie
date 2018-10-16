import {Document, Model, model, Schema} from 'mongoose';

export interface UserInterface extends Document {
  username: string;
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 255,
  },
});

export const UserModel: Model<UserInterface> =
    model<UserInterface>('User', UserSchema);
