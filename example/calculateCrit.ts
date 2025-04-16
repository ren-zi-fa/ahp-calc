import { calculcateCritMatrix } from "../lib/method";

const critMatriks: string[][] = [
  ["1", "3", "5", "7", "7"],
  ["1/3", "1", "3", "5", "5"],
  ["1/5", "1/3", "1", "3", "3"],
  ["1/7", "1/5", "1/3", "1", "2"],
  ["1/7", "1/5", "1/3", "1/2", "1"],
];
const {
  normalizedMatrix,
  CI,
  CR,
  RI,
  convertedMatrix,
  konsistensi,
  lamdaMax,
  sumCrit,
  n,
  weightsCriteria,
} = calculcateCritMatrix(critMatriks);
console.log({
  sumCrit,
  normalizedMatrix,
  CI,
  CR,
  RI,
  convertedMatrix,
  lamdaMax,
  konsistensi,
  n,
  weightsCriteria,
});
