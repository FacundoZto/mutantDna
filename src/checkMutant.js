const isMutant = (dna) => {
  const N = dna.length;
  let sequenceCount = 0;

  const checkSequence = (x, y, dx, dy) => {
    const letter = dna[x][y];
    for (let i = 1; i < 4; i++) {
      const newX = x + i * dx;
      const newY = y + i * dy;
      if (newX >= N || newY >= N || dna[newX][newY] !== letter) return false;
    }
    return true;
  };

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (
        (j <= N - 4 && checkSequence(i, j, 0, 1)) || 
        (i <= N - 4 && checkSequence(i, j, 1, 0)) ||  
        (i <= N - 4 && j <= N - 4 && checkSequence(i, j, 1, 1)) ||  
        (i >= 3 && j <= N - 4 && checkSequence(i, j, -1, 1))  
      ) {
        sequenceCount++;
        if (sequenceCount > 1) return true;
      }
    }
  }
  return false;
}

module.exports = {isMutant};