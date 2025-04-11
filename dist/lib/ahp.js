"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AHPClient = void 0;
const constant_1 = require("./constant");
class AHPClient {
    constructor() {
        this.checkIsSlash = (str) => {
            if (str.length > 2) {
                if (str.includes("/")) {
                    if (str[0] !== "/" && str[2] !== "/")
                        return true;
                    else
                        return false;
                }
            }
            if (str.length <= 2) {
                if (str.includes("/"))
                    return false;
                else
                    return true;
            }
        };
        this.convertMatrix = (matrix) => {
            const convertedMatrix = [];
            let isError = false;
            for (let i = 0; i < matrix.length; i++) {
                const mi = [];
                for (let j = 0; j < matrix[i].length; j++) {
                    if (this.checkIsSlash(matrix[i][j])) {
                        if (matrix[i][j].length === 3) {
                            mi.push(Number(matrix[i][j].slice(0, 1)) /
                                Number(matrix[i][j].slice(2, 3)));
                        }
                        else
                            mi.push(Number(matrix[i][j]));
                    }
                    else {
                        isError = true;
                        break;
                    }
                }
                convertedMatrix.push(mi);
            }
            return { convertedMatrix, isError };
        };
        this.calcPriority = (matrix) => {
            const u = [];
            const w = [];
            for (let i = 0; i < matrix.length; i++) {
                const ui = matrix[i].reduce((acc, cur) => acc * cur);
                u.push(ui ** (1 / 4));
            }
            for (let i = 0; i < matrix.length; i++) {
                const uj = u.reduce((acc, cur) => acc + cur, 0);
                const wi = u[i] / uj;
                w.push(Number(wi.toFixed(6)));
            }
            return w;
        };
        this.calcIntensity = (matrix, w) => {
            const intensity = [];
            for (let i = 0; i < matrix.length; i++) {
                const inti = matrix[i].reduce((acc, cur, ind) => acc + cur * w[ind], 0);
                intensity.push(Number(inti.toFixed(6)));
            }
            return intensity;
        };
        this.calcFraction = (w, intensity) => {
            const fraction = [];
            for (let i = 0; i < w.length; i++) {
                fraction.push(Number((intensity[i] / w[i]).toFixed(6)));
            }
            return fraction;
        };
        this.calcLambda = (fraction) => {
            const lambda = fraction.reduce((sum, record) => sum + record, 0) /
                fraction.length;
            return Number(lambda.toFixed(6));
        };
        this.calcInd = (lambda, length) => {
            return Number(((lambda - length) / (length - 1)).toFixed(6));
        };
        this.calcRelativeCoherence = (ind, consistInd) => {
            return Number((ind / consistInd).toFixed(6));
        };
        this.calcMatrixResults = (matrix) => {
            const { convertedMatrix, isError } = this.convertMatrix(matrix);
            if (!isError) {
                const consistInd = constant_1.avgConsistInd[convertedMatrix.length - 3];
                const w = this.calcPriority(convertedMatrix);
                const intensity = this.calcIntensity(convertedMatrix, w);
                const fraction = this.calcFraction(w, intensity);
                const lambda = this.calcLambda(fraction);
                const ind = this.calcInd(lambda, convertedMatrix.length);
                const coherence = this.calcRelativeCoherence(ind, consistInd);
                return { w, intensity, fraction, lambda, ind, coherence, consistInd };
            }
            else
                return "Something went wrong";
        };
        this.calcResults = (matrixes) => {
            let isError = false;
            const result = matrixes.map((matrix) => {
                const res = this.calcMatrixResults(matrix);
                if (typeof res === "string") {
                    isError = true;
                    return {
                        w: [],
                        intensity: [],
                        fraction: [],
                        lambda: 0,
                        ind: 0,
                        coherence: 0,
                        consistInd: 0,
                    };
                }
                return res;
            });
            if (isError)
                return "Something went wrong";
            let gVectors = [...result[0].w];
            let gVector = 0;
            let ind = 0;
            for (let i = 1; i < result.length; i++) {
                for (let j = 0; j < result[i].w.length; j++) {
                    gVectors[j] += Number(result[i].w[j]);
                }
            }
            for (let i = 0; i < gVectors.length; i++) {
                gVectors[i] = gVectors[i] / result.length;
                if (gVectors[i] > gVector) {
                    gVector = gVectors[i];
                    ind = i;
                }
            }
            return {
                vectors: gVectors,
                vectorInd: ind,
                matrixesRes: result,
            };
        };
    }
}
exports.AHPClient = AHPClient;
