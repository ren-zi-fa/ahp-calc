type MatrixType = Array<string[]>;
type AltMatrixes = Array<MatrixType>;
type ConvertedMatrix = Array<number[]>;
type CalcMatrixResult = {
    w: number[];
    intensity: number[];
    fraction: number[];
    lambda: number;
    ind: number;
    coherence: number;
    consistInd: number;
};
type ConvertedMatrixResult = {
    convertedMatrix: ConvertedMatrix;
    isError: boolean;
};
type CalcAllMatrixResult = {
    vectors: number[];
    vectorInd: number;
    matrixesRes: CalcMatrixResult[];
};
export type { AltMatrixes, ConvertedMatrix, CalcMatrixResult, MatrixType, ConvertedMatrixResult, CalcAllMatrixResult };
