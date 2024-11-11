const Dna = require("../models/Dna.js");
const { isMutant } = require("../checkMutant.js");

module.exports = {
  dnaChecker: async (req, res) => {
    const { dna } = req.body;

    if (!dna || !Array.isArray(dna)) {
      return res.status(400).json({
        error: "Invalid DNA format",
      });
    }

    try {
      //caso en el que se encuentre en la base de datos
      let dnaRecord = await Dna.findOne({ dna });

      if (dnaRecord) {
        return dnaRecord.isMutant
          ? res.status(200).send("Mutant detected")
          : res.status(403).send("Not a mutant");
      }

      const mutantCheck = isMutant(dna);

      dnaRecord = new Dna({
        dna,
        isMutant: mutantCheck,
      });
      await dnaRecord.save();

      return mutantCheck
        ? res.status(200).send("Mutant detected")
        : res.status(403).send("Not a mutant");
    } catch (error) {
      console.error("Error route /mutant:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  dnaStats: async (req, res) => {
    const mutantCount = await Dna.countDocuments({ isMutant: true });
    const humanCount = await Dna.countDocuments({ isMutant: false });

    const ratio =
      humanCount === 0 ? 0 : (countMutantDna / countHumanDna).toFixed(2);

    res.json({
      count_mutant_dna: mutantCount,
      count_human_dna: humanCount,
      ratio,
    });
  },
};
