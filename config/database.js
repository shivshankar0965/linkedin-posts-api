const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectDatabase = () => {
  mongoose
    .connect(process.env.mongoURL)
    .then((data) => {
      console.log(`mongoDB connected with server: ${data.connection.host}`);
    })
    .catch((err) => {
      console.log({ message: "can't connect the database", error: err });
    });
};

module.exports = {
  connectDatabase,
};
