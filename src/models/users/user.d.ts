import { Document } from "mongoose";

export interface UserType {
  name: string;
  surname?: string;
  email: string;
  password: string;
  profilePicture?: string;
}
