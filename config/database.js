import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const mongoUri = "mongodb+srv://srushtidm:srushtidm@cluster0.ghfw5.mongodb.net/practicalmanagementsystem";
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Connection failed", error);
  }
};

export default dbConnect;
