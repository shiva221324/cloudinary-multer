const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDb = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("DB connection established");
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

module.exports = connectDb;
