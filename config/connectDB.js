const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_uri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log(`mongodb holbogdloo: ${conn.connection.host}`);
  } catch (e) {
    console.log(e);
  }
};
module.exports = connectDb;
