import { AHPClient } from "../lib/ahp";
import { AltMatrixes } from "../lib/types";

describe("AHPClient", () => {
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
