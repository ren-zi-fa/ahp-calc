import { AHPClient } from "../lib/ahp";
import { MatrixType, AltMatrixes } from "../lib/types";

describe("AHPClient", () => {
  describe("checkIsSlash", () => {
    it("returns true for valid slash format", () => {
      expect(AHPClient.checkIsSlash("3/4")).toBe(true);
    });

    it("returns false for leading slash", () => {
      expect(AHPClient.checkIsSlash("/4")).toBe(false);
    });

    it("returns false for slash too short", () => {
      expect(AHPClient.checkIsSlash("3/")).toBe(false);
    });

    it("returns true for non-slash short input", () => {
      expect(AHPClient.checkIsSlash("2")).toBe(true);
    });
  });

  describe("convertMatrix", () => {
    it("converts valid matrix with slashes", () => {
      const matrix: MatrixType = [
        ["1", "1/2"],
        ["2", "1"],
      ];
      const { convertedMatrix, isError } = AHPClient.convertMatrix(matrix);
      expect(isError).toBe(false);
      expect(convertedMatrix.length).toBe(2);
      expect(convertedMatrix[0][1]).toBeCloseTo(0.5);
    });

    it("returns error for invalid matrix entry", () => {
      const matrix: MatrixType = [
        ["1", "/2"],
        ["2", "1"],
      ];
      const { isError } = AHPClient.convertMatrix(matrix);
      expect(isError).toBe(true);
    });
  });

  describe("calcPriority", () => {
    it("calculates weight vector", () => {
      const converted: number[][] = [
        [1, 1 / 2, 4, 3],
        [2, 1, 7, 5],
        [1 / 4, 1 / 7, 1, 1 / 2],
        [1 / 3, 1 / 5, 2, 1],
      ];
      const result = AHPClient.calcPriority(converted);
      expect(result.length).toBe(4);
      expect(result.reduce((acc, cur) => acc + cur, 0)).toBeCloseTo(1);
    });
  });

  describe("calcMatrixResults", () => {
    it("calculates matrix results correctly", () => {
      const matrix: MatrixType = [
        ["1", "1/2", "4", "3"],
        ["2", "1", "7", "5"],
        ["1/4", "1/7", "1", "1/2"],
        ["1/3", "1/5", "2", "1"],
      ];
      const result = AHPClient.calcMatrixResults(matrix);
      if (typeof result !== "string") {
        expect(result.w.length).toBe(4);
        expect(result.lambda).toBeGreaterThan(0);
      } else {
        throw new Error("Unexpected error in matrix results");
      }
    });
  });

  describe("calcResults", () => {
    it("aggregates multiple matrices", () => {
      const matrixes: AltMatrixes = [
        [
          ["1", "1/2", "4", "3"],
          ["2", "1", "7", "5"],
          ["1/4", "1/7", "1", "1/2"],
          ["1/3", "1/5", "2", "1"],
        ],
        [
          ["1", "3", "1/5", "1/7"],
          ["1/3", "1", "1/7", "1/9"],
          ["5", "7", "1", "1/3"],
          ["7", "9", "3", "1"],
        ],
      ];
      const result = AHPClient.calcResults(matrixes);
      if (typeof result !== "string") {
        expect(result.vectors.length).toBe(4);
        expect(result.vectorInd).toBeGreaterThanOrEqual(0);
      } else {
        throw new Error("Failed to calculate results");
      }
    });
  });
});
