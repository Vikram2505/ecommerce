const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    // if (process.env.NODE_ENV === "development") {
      mongoose.set("strictQuery", false);
      const conn = await mongoose.connect(
        "mongodb://localhost:27017/ecommerce"
      );
      console.log(`MongoDB Connected with ${conn.connection.host}`);
    // } else if (process.env.NODE_ENV === "production") {
    //   const conn = await mongoose.connect(
    //     "mongodb+srv://vikram:vikram@testapi.yszcywk.mongodb.net/?retryWrites=true&w=majority"
    //     // "mongodb+srv://figir1234:vikram@cluster0.ig4y2.mongodb.net/?retryWrites=true&w=majority"
    //   );
    //   console.log(`MongoDB Connected with ${conn.connection.host}`);
    // }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
