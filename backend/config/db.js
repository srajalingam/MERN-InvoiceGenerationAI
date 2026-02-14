import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://lingamraja299_db_user:rainvoice@cluster0.hwtbhpp.mongodb.net/RAInvoice').then(() => {
        console.log("MongoDB connected successfully");
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit with failure
  }
};