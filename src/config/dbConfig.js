const mongoose = require('mongoose');

const dbConfig = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://facundozerbato:H1injC5Wl3A4mcwo@clusterprueba.vlu38.mongodb.net/mutantDB?retryWrites=true&w=majority",
    );
    console.log("Connected to the database");
  } catch(error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = dbConfig;