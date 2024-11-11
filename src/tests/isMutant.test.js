const {isMutant} = require('../checkMutant.js');

describe('isMutant function', () => {
  test('should return true for a valid mutant sequence', () => {
    const dna = ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"];
    expect(isMutant(dna)).toBe(true);
  })

  test('should return false for an invalid mutant sequence', () => {
    const dna = ["ATCGGA", "CAGTGC", "TTATTT", "AGACGG", "GCGTCA", "TCACTG"];
    expect(isMutant(dna)).toBe(false);
  })
})