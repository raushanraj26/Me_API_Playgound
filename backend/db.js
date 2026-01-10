const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
   // await mongoose.connect("mongodb://127.0.0.1:27017/profileDB"); //profileDB is databse name
   await mongoose.connect(process.env.MONGODB_URI);  //using env variable for connecting to mongodb
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1); 
  }
};

module.exports = connectDB;
