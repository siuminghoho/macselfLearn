function rnaTranscription(dna: Array<string>): string {
    let rna = "";
    for (let nucleotide of dna) {
      switch (nucleotide) {
        case "G":
          rna += "C";
          break;
        case "C":
          rna += "G";
          break;
        case "T":
          rna += "A";
          break;
        case "A":
          rna += "U";
          break;
        default:
          throw new Error(`The nucleotide ${nucleotide} does not exist`);
      }
    }
    return rna;
  }