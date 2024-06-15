const mongoose = require("mongoose");
require("dotenv").config();

const { MONGODB_URL } = process.env;

exports.connect = () => {
  try {
    mongoose
      .connect(MONGODB_URL)
      .then(console.log(`DB Connection Success`))
      .catch((err) => {
        console.log(`DB Connection Failed`);
        console.log(err);
     
      });
  } catch (e) {
    console.log("error", e);
  }
};
