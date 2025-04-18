import {
  calculateAltMatrix,
  calculateCompositeWeights,
  calculcateCritMatrix,
} from "../lib/method";
const critMatriks: string[][] = [
  ["1", "3", "5", "7", "7"],
  ["1/3", "1", "3", "5", "5"],
  ["1/5", "1/3", "1", "3", "3"],
  ["1/7", "1/5", "1/3", "1", "2"],
  ["1/7", "1/5", "1/3", "1/2", "1"],
];

const altMatrix: string[][][] = [
  [
    ["1", "3", "2", "1/3"],
    ["1/3", "1", "1/3", "1/5"],
    ["1/2", "3", "1", "1/3"],
    ["3", "5", "3", "1"],
  ],
  [
    ["1", "3", "5", "2"],
    ["1/3", "1", "3", "1/3"],
    ["1/5", "1/3", "1", "1/5"],
    ["1/2", "3", "5", "1"],
  ],
  [
    ["1", "3", "1/5", "1/2"],
    ["3", "1", "1/3", "1/3"],
    ["5", "3", "1", "2"],
    ["5", "3", "1/2", "1"],
  ],
  [
    ["1", "1/3", "2", "1/3"],
    ["3", "1", "3", "2"],
    ["1/2", "1/3", "1", "1/3"],
    ["3", "1/2", "3", "1"],
  ],
];

const { weightsCriteria } = calculcateCritMatrix(critMatriks);
const { weightAlt } = calculateAltMatrix(altMatrix);
const res = calculateCompositeWeights(weightAlt, weightsCriteria);
console.log(res);

