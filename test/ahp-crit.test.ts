import { AHPCrit } from "../lib/ahpCrit";
import {
  matrixtest,
  convertedMatrix,
  normalizedMatrix,
  weightsCriteria,
  lamdaMax,
  CI,
  CR,
  RI,
  konsistensi,
  n,
  sumCrit,
} from "./vars";

describe("AHPCrit class", () => {
  it("convertStringMatrixToNumber should convert string to number correctly", () => {
    const result = AHPCrit.convertStringMatrixToNumber(matrixtest);
    expect(result).toEqual(convertedMatrix);
  });

  it("getMatrixOrders should return correct matrix order", () => {
    const result = AHPCrit.getMatrixOrders(normalizedMatrix);
    expect(result).toBe(5);
  });

  it("countTotalEachColumn should calculate column sums", () => {
    const result = AHPCrit.countTotalEachColumn(convertedMatrix);
    expect(result).toEqual([1.819, 4.733, 9.666, 16.5, 18]);
  });

  it("normalizeMatrix should return normalized matrix", () => {
    const result = AHPCrit.normalizeMatrix(convertedMatrix);
    expect(result).toEqual(normalizedMatrix);
  });

  it("calculateCriteriaWeight should return weight of each criteria", () => {
    const result = AHPCrit.calculateCriteriaWeight(normalizedMatrix);
    expect(result).toEqual(weightsCriteria);
  });

  it("calculateLamdaMax should return lamda max", () => {
    const result = AHPCrit.calculateLamdaMax(convertedMatrix, weightsCriteria);
    expect(result).toBeCloseTo(lamdaMax, 3);
  });

  it("calculateConsistencyIndex should return CI", () => {
    const result = AHPCrit.calculateConsistencyIndex(lamdaMax, n);
    expect(result).toBeCloseTo(CI, 3);
  });

  it("should return correct CR and isConsistent = true when CR < 0.1", () => {
    const CI = 0.05;
    const RI = 1.12;
    const result = AHPCrit.calculateConsistencyRatio(CI, RI);
    expect(result).toEqual({
      CR: parseFloat((CI / RI).toFixed(3)),
      isConsistent: true,
    });
  });

  it("should return correct CR and isConsistent = false when CR >= 0.1", () => {
    const CI = 0.2;
    const RI = 1.12;
    const result = AHPCrit.calculateConsistencyRatio(CI, RI);
    expect(result).toEqual({
      CR: parseFloat((CI / RI).toFixed(3)),
      isConsistent: false,
    });
  });

  it("should return CR = 0 and isConsistent = true when RI is undefined", () => {
    const result = AHPCrit.calculateConsistencyRatio(0.1, undefined);
    expect(result).toEqual({
      CR: 0,
      isConsistent: true,
    });
  });

  it("should return CR = 0 and isConsistent = true when RI = 0", () => {
    const result = AHPCrit.calculateConsistencyRatio(0.1, 0);
    expect(result).toEqual({
      CR: 0,
      isConsistent: true,
    });
  });

  it("should throw error on invalid matrix input in convertStringMatrixToNumber", () => {
    expect(() => {
      AHPCrit.convertStringMatrixToNumber({} as any);
    }).toThrow("Invalid matrix input.");
  });

  it("should throw error when getMatrixOrders input is not square", () => {
    const invalidMatrix = [
      [1, 2],
      [3, 4, 5],
    ];
    expect(() => {
      AHPCrit.getMatrixOrders(invalidMatrix as any);
    }).toThrow(/Matrix is not square/);
  });

  it("should throw error on invalid format in countTotalEachColumn", () => {
    const res = AHPCrit.countTotalEachColumn(convertedMatrix);
    expect(res).toEqual(sumCrit);
  });
});
