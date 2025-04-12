import { AltMatrixes, CalcAllMatrixResult, CalcMatrixResult, ConvertedMatrix, ConvertedMatrixResult, MatrixType } from "./types";
export declare class AHPClient {
    static checkIsSlash: (str: string) => Boolean | undefined;
    static convertMatrix: (matrix: MatrixType) => ConvertedMatrixResult;
    static calcPriority: (matrix: ConvertedMatrix) => number[];
    static calcIntensity: (matrix: ConvertedMatrix, w: number[]) => number[];
    static calcFraction: (w: number[], intensity: number[]) => number[];
    static calcLambda: (fraction: number[]) => number;
    static calcInd: (lambda: number, length: number) => number;
    static calcRelativeCoherence: (ind: number, consistInd: number) => number;
    static calcMatrixResults: (matrix: MatrixType) => CalcMatrixResult | string;
    static calcResults: (matrixes: AltMatrixes) => CalcAllMatrixResult | string;
}
