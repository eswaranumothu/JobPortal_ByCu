const mongoose = require("mongoose");

let connection = mongoose
  .connect("mongodb://localhost:27017/jobportal")
  .then(() => {
    console.log("Mongoose Connected!");
  })
  .catch((e) => {
    console.log("Mongoose Connection Failed!", e.message);
  });

module.exports = connection;
