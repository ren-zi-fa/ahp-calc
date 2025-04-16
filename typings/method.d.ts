import { AHPCritResult } from "./types";
declare function calculcateCritMatrix(matrix: string[][] | number[][]): AHPCritResult;
declare function calculateAltMatrix(matrix: string[][][] | number[][][]): {
    originalMatrix: any;
    normalized: number[][][];
    sumAlt: number[][];
    weightAlt: number[][];
    lamdaMax: number[];
    n: number[];
    Ci: number[];
    CR: {
        CR: number;
        isConsistent: boolean;
    }[];
    RI: number;
    isConsistent: boolean[];
};
declare function calculateCompositeWeights(alternatives: number[][], criteriaWeights: number[]): number[];
export { calculateAltMatrix, calculcateCritMatrix, calculateCompositeWeights };
