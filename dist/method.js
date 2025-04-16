"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAltMatrix = calculateAltMatrix;
exports.calculcateCritMatrix = calculcateCritMatrix;
exports.calculateCompositeWeights = calculateCompositeWeights;
const ahpAlt_1 = require("./ahpAlt");
const ahpCrit_1 = require("./ahpCrit");
function calculcateCritMatrix(matrix) {
    const instance = new ahpCrit_1.AHPCrit();
    const isStringMatrix = typeof matrix[0][0] === "string";
    const originalMatrix = isStringMatrix
        ? ahpCrit_1.AHPCrit.convertStringMatrixToNumber(matrix)
        : matrix;
    const normalizedMatrix = ahpCrit_1.AHPCrit.normalizeMatrix(originalMatrix);
    const weightsCriteria = ahpCrit_1.AHPCrit.calculateCriteriaWeight(originalMatrix);
    const lamdaMax = ahpCrit_1.AHPCrit.calculateLamdaMax(originalMatrix, weightsCriteria);
    const n = ahpCrit_1.AHPCrit.getMatrixOrders(originalMatrix);
    const CI = ahpCrit_1.AHPCrit.calculateConsistencyIndex(lamdaMax, n);
    const RI = instance.ri.get(n) ?? 0;
    const CR = ahpCrit_1.AHPCrit.calculateConsistencyRatio(CI, RI);
    const sumCrit = ahpCrit_1.AHPCrit.countTotalEachColumn(originalMatrix);
    const konsistensi = CR.CR <= 0.1
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
function calculateAltMatrix(matrix) {
    // Validasi tipe isi matriks (harus seragam string atau number)
    const firstValue = matrix?.[0]?.[0]?.[0];
    const is3D = Array.isArray(matrix) &&
        matrix.every((layer) => Array.isArray(layer) &&
            layer.every((row) => Array.isArray(row) &&
                row.every((val) => typeof val === typeof firstValue)));
    if (!is3D) {
        throw new Error("Input harus berupa matriks 3D dengan elemen seragam bertipe string[][][] atau number[][][].");
    }
    const isStringMatrix = typeof firstValue === "string";
    const originalMatrix = isStringMatrix
        ? ahpAlt_1.AHPAlt.convertStringMatrixToNumber(matrix)
        : matrix;
    const normalized = ahpAlt_1.AHPAlt.normalizeMatrixAlt(originalMatrix);
    const sumAlt = ahpAlt_1.AHPAlt.countTotalAlterEachColumn(originalMatrix);
    const weightAlt = ahpAlt_1.AHPAlt.calculateCriteriaWeightAlt(originalMatrix);
    const lamdaMax = ahpAlt_1.AHPAlt.calculateLambdaMax(originalMatrix, weightAlt);
    const n = ahpAlt_1.AHPAlt.getMatrixOrdersForAlt(originalMatrix);
    const Ci = ahpAlt_1.AHPAlt.calculateConsistencyIndexForAlt(lamdaMax, n);
    const instance = new ahpAlt_1.AHPAlt();
    const RI = instance.ri.get(n[0]) ?? 0;
    const CR = ahpAlt_1.AHPAlt.calculateConsistencyRatios(Ci, RI);
    return {
        originalMatrix,
        normalized,
        sumAlt,
        weightAlt,
        lamdaMax,
        n,
        Ci,
        CR,
        RI,
        isConsistent: CR.map((cr) => cr.isConsistent),
    };
}
function calculateCompositeWeights(alternatives, criteriaWeights) {
    // Normalisasi Matriks
    const columnSums = alternatives[0].map((_, colIndex) => {
        return Math.sqrt(alternatives.reduce((sum, row) => sum + Math.pow(row[colIndex], 2), 0));
    });
    const normalizedMatrix = alternatives.map((row) => row.map((value, colIndex) => value / columnSums[colIndex]));
    // Menghitung Composite Weight untuk Setiap Alternatif
    const compositeWeights = normalizedMatrix.map((row) => row.reduce((sum, value, index) => sum + value * criteriaWeights[index], 0));
    return compositeWeights;
}
