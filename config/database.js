import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Connection failed", error);
  }
};

export default dbConnect;
