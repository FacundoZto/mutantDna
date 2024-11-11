const mongoose = require("mongoose");

const dnaSchema = new mongoose.Schema({
  dna: {
    type: [String],
    required: true,
    unique: true,
    match: /^[ATCG]+$/
  },
  isMutant: {
    type: Boolean,
    required: true
  }
});

const Dna = mongoose.model("Dna", dnaSchema);

module.exports = Dna;