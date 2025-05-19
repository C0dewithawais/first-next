import mongoose from "mongoose";

export default async function dbConnect() {
  if (mongoose.connection.readyState == 1) {
    console.log("already connected");
    return;
  }
  try {
    await mongoose.connect(
      "mongodb+srv://root:root@cluster0.agbcnir.mongodb.net/next"
    );
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
}
