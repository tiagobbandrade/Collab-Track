import { ObjectId, Schema, model } from "mongoose";
import { UserType } from "./user";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v: string) => /^\S+@\S+\.\S+$/.test(v),
      message: (props: { value: string }) =>
        `${props.value} não é um e-mail válido!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profilePicture: {
    type: String,
    default: null,
  },
  hasConfirmedAccout: {
    type: String,
    default: false,
  },
});

export class User {
  private model;

  constructor() {
    this.model = model("user", userSchema);
  }

  async findByEmail(email: string) {
    return this.model.findOne({ email });
  }

  async confirmAccout(userId: ObjectId) {
    return this.model.findOneAndUpdate(
      { _id: userId },
      { hasConfirmedAccout: true }
    );
  }

  async createUser({
    email,
    name,
    password,
    profilePicture,
    surname,
  }: UserType) {
    return this.model.create({
      email,
      name,
      password,
      profilePicture,
      surname,
    });
  }
}
