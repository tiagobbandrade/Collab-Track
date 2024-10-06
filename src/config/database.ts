import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_URL || "");
    console.log("Database connected");
  } catch (e) {
    console.log(e);
  }
}
