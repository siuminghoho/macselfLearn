function findFactors(num: number):number[] {
    let factors:number[] = [];
    for (let factor:number = 2; factor <= num / 2; factor++) {
      if (num % factor === 0) {
        factors.push(factor);
      }
    }
    return factors;
  }

  console.log(findFactors(12)); // [2, 3, 4, 6]