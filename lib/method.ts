import { AHPAlt } from "./ahpAlt";
import { AHPCrit } from "./ahpCrit";
import { AHPCritResult } from "./types";

function calculcateCritMatrix(matrix: string[][] | number[][]): AHPCritResult {
  const instance = new AHPCrit();

  const isStringMatrix = typeof matrix[0][0] === "string";

  const originalMatrix = isStringMatrix
    ? AHPCrit.convertStringMatrixToNumber(matrix as string[][])
    : (matrix as number[][]);

  const normalizedMatrix = AHPCrit.normalizeMatrix(originalMatrix);
  const weightsCriteria = AHPCrit.calculateCriteriaWeight(originalMatrix);
  const lamdaMax = AHPCrit.calculateLamdaMax(originalMatrix, weightsCriteria);
  const n = AHPCrit.getMatrixOrders(originalMatrix);
  const CI = AHPCrit.calculateConsistencyIndex(lamdaMax, n);
  const RI = instance.ri.get(n) ?? 0;
  const CR = AHPCrit.calculateConsistencyRatio(CI, RI);
  const sumCrit = AHPCrit.countTotalEachColumn(originalMatrix);

  const konsistensi =
    CR.CR <= 0.1
      ? "🟢 Matriks konsisten (CR ≤ 0.1)"
      : "🔴 Matriks tidak konsisten (CR > 0.1)";

  return {
    sumCrit,
    originalMatrix,
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

function calculateAltMatrix(matrix: string[][][] | number[][][]) {
  // Validasi tipe isi matriks (harus seragam string atau number)
  const firstValue = matrix?.[0]?.[0]?.[0];
  const is3D =
    Array.isArray(matrix) &&
    matrix.every(
      (layer) =>
        Array.isArray(layer) &&
        layer.every(
          (row) =>
            Array.isArray(row) &&
            row.every((val) => typeof val === typeof firstValue)
        )
    );

  if (!is3D) {
    throw new Error(
      "Input harus berupa matriks 3D dengan elemen seragam bertipe string[][][] atau number[][][]."
    );
  }

  const isStringMatrix = typeof firstValue === "string";

  const originalMatrix = isStringMatrix
    ? AHPAlt.convertStringMatrixToNumber(matrix as string[][][])
    : (matrix as number[][][]);

  const normalized = AHPAlt.normalizeMatrixAlt(originalMatrix);
  const sumAlt = AHPAlt.countTotalAlterEachColumn(originalMatrix);
  const bobotPriority = AHPAlt.calculateCriteriaWeightAlt(normalized);
  const weight = AHPAlt.calculateCriteriaWeightAlt(originalMatrix);
  const lamdaMax = AHPAlt.calculateLambdaMax(originalMatrix, weight);
  const n = AHPAlt.getMatrixOrdersForAlt(originalMatrix);
  const Ci = AHPAlt.calculateConsistencyIndexForAlt(lamdaMax, n);

  const instance = new AHPAlt();
  const RI = instance.ri.get(n[0]) ?? 0;
  const CR = AHPAlt.calculateConsistencyRatios(Ci, RI);

  return {
    originalMatrix,
    normalized,
    sumAlt,
    bobotPriority,
    weight,
    lamdaMax,
    n,
    Ci,
    CR,
    RI,
    isConsistent: CR.map((cr) => cr.isConsistent),
  };
}
export { calculateAltMatrix, calculcateCritMatrix };
