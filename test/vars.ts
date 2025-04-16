const matrixtest: string[][] = [
  ["1", "3", "5", "7", "7"],
  ["1/3", "1", "3", "5", "5"],
  ["1/5", "1/3", "1", "3", "3"],
  ["1/7", "1/5", "1/3", "1", "2"],
  ["1/7", "1/5", "1/3", "1/2", "1"],
];
const sumCrit = [1.819, 4.733, 9.666, 16.5, 18];

const normalizedMatrix = [
  [0.55, 0.634, 0.517, 0.424, 0.389],
  [0.183, 0.211, 0.31, 0.303, 0.278],
  [0.11, 0.07, 0.103, 0.182, 0.167],
  [0.079, 0.042, 0.034, 0.061, 0.111],
  [0.079, 0.042, 0.034, 0.03, 0.056],
];

const CI = 0.049;

const CR = 0.044;

const RI = 1.12;

const convertedMatrix = [
  [1, 3, 5, 7, 7],
  [0.333, 1, 3, 5, 5],
  [0.2, 0.333, 1, 3, 3],
  [0.143, 0.2, 0.333, 1, 2],
  [0.143, 0.2, 0.333, 0.5, 1],
];

const lamdaMax = 5.197;

const konsistensi = "🟢 Matriks konsisten (CR ≤ 0.1)";

const n = 5;

const weightsCriteria = [0.503, 0.257, 0.126, 0.065, 0.048];

export {
  matrixtest,
  CI,
  CR,
  RI,
  convertedMatrix,
  konsistensi,
  lamdaMax,
  n,
  normalizedMatrix,
  sumCrit,
  weightsCriteria,
};
