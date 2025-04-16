import { AHPCrit } from "./ahpCrit";
import { AHPCritResult } from "./types";

export function calculcateCritMatrix(
  matrix: string[][] | number[][]
): AHPCritResult {
  const instance = new AHPCrit();

  const isStringMatrix = typeof matrix[0][0] === "string";

  const convertedMatrix = isStringMatrix
    ? AHPCrit.convertStringMatrixToNumber(matrix as string[][])
    : (matrix as number[][]);

  const normalizedMatrix = AHPCrit.normalizeMatrix(convertedMatrix);
  const weightsCriteria = AHPCrit.calculateCriteriaWeight(normalizedMatrix);
  const lamdaMax = AHPCrit.calculateLamdaMax(convertedMatrix, weightsCriteria);
  const n = AHPCrit.getMatrixOrders(convertedMatrix);
  const CI = AHPCrit.calculateConsistencyIndex(lamdaMax, n);
  const RI = instance.ri.get(n) ?? 0;
  const CR = AHPCrit.calculateConsistencyRatio(CI, RI);
  const sumCrit = AHPCrit.countTotalEachColumn(convertedMatrix);

  const konsistensi =
    CR.CR <= 0.1
      ? "🟢 Matriks konsisten (CR ≤ 0.1)"
      : "🔴 Matriks tidak konsisten (CR > 0.1)";

  return {
    sumCrit,
    convertedMatrix,
    normalizedMatrix,
    weightsCriteria,
    lamdaMax,
    n,
    CI,
    RI,
    CR: CR.CR,
    konsistensi,
  };
}
