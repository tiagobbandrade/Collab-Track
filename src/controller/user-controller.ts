import { UserType } from "../models/users/user";
import { User } from "../models/users/users";
import bcrypt from "bcrypt";

export class UserController {
  private userModel = new User();

  async createNewUser({
    email,
    name,
    password,
    profilePicture = "",
    surname = "",
  }: UserType) {
    const isUserExists = await this.userModel.findByEmail(email);

    if (isUserExists) throw new Error("User already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await this.userModel.createUser({
      email,
      name,
      password: hashedPassword,
      profilePicture,
      surname,
    });

    return {
      message: "User created successfully",
      status: 201,
    };
  }
}
