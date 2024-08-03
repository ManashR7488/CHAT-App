const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}/testChatApp`);
    console.log(`Mongoose Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};


module.exports = ConnectDB;