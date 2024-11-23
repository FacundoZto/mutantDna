const mongoose = require('mongoose');
require('dotenv').config();

const dbConfig = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://facundozerbato:${process.env.API_KEY}@clusterprueba.vlu38.mongodb.net/mutantDB?retryWrites=true&w=majority`,
    );
    console.log("Connected to the database");
  } catch(error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = dbConfig;