const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Dna = require('../models/Dna');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterEach(async () => {
  await Dna.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("POST /mutant", () => {
  it("should return 200 if DNA is mutant", async () => {
    const response = await request(app)
      .post("/mutant")
      .send({ dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"] });

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Mutant detected");
  });

  it("should return 403 if DNA is not mutant", async () => {
    const response = await request(app)
      .post("/mutant")
      .send({ dna: ["ATCGGA", "CAGTGC", "TTATTT", "AGACGG", "GCGTCA", "TCACTG"] });

    expect(response.statusCode).toBe(403);
    expect(response.text).toBe("Not a mutant");
  });

  it("should return 400 for invalid DNA format", async () => {
    const response = await request(app)
      .post("/mutant")
      .send({ dna: "invalid_data" });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Invalid DNA format");
  });
});

describe("GET /stats", () => {
  it("should return mutant and human counts with ratio", async () => {
    await Dna.create([
      { dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"], isMutant: true },
      { dna: ["ATGAGA", "CACTGC", "TGATGT", "AGTAGG", "CTCGTA", "TCGCTG"], isMutant: false },
    ]);

    const response = await request(app).get("/stats");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      count_mutant_dna: 1,
      count_human_dna: 1,
      ratio: "1.00",
    });
  });
});