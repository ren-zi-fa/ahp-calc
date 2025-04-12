import { AltMatrixes, CalcAllMatrixResult } from "./types";
export declare class AHPClient {
    private checkIsSlash;
    private convertMatrix;
    private calcPriority;
    private calcIntensity;
    private calcFraction;
    private calcLambda;
    private calcInd;
    private calcRelativeCoherence;
    private calcMatrixResults;
    static calcResults: (matrixes: AltMatrixes) => CalcAllMatrixResult | string;
}
