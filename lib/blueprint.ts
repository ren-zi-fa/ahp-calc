import {
  AltMatrixes,
  CalcAllMatrixResult,
  CalcMatrixResult,
  ConvertedMatrix,
  ConvertedMatrixResult,
  MatrixType,
} from "./types";

interface AHPClientBlueprint {
  checkIsSlash: (str: string) => Boolean | undefined;
  convertMatrix: (matrix: MatrixType) => ConvertedMatrixResult;
  calcPriority: (matirx: ConvertedMatrix) => number[];
  calcIntensity: (matrix: ConvertedMatrix, w: number[]) => number[];
  calcFraction: (w: number[], intensity: number[]) => number[];
  calcLambda: (fraction: number[], record: number) => number;
  calcInd: (lambda: number, length: number) => number;
  calcRelativeCoherence: (ind: number, consistInd: number) => number;
  calcMatrixResults: (matrix: MatrixType) => CalcMatrixResult | string;
  calcResults: (matrixes: AltMatrixes) => CalcAllMatrixResult | string;
}

export type { AHPClientBlueprint };
