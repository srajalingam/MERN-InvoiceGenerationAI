import mongoose from "mongoose";
// import dns from "dns";

// dns.setDefaultResultOrder("ipv4first");

export const connectDB = async () => {
  try {
    //mongodb+srv://lingamraja299_db_user:<db_password>@cluster0.ex4qkwx.mongodb.net/
    await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("MongoDB connected successfully");
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit with failure
  }
};