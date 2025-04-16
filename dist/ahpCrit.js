"use strict";
/**
 * AHP (Analytic Hierarchy Process) class untuk menghitung bobot dan konsistensi matriks perbandingan berpasangan.
 * Mendukung konversi nilai string ke number, normalisasi matriks, perhitungan bobot lokal/global, dan uji konsistensi tidak mendukung sub kriteriia.
 *
 * @module AHP
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AHPCrit = void 0;
const utils_1 = require("./utils");
/**
 * Kelas utama untuk mengimplementasikan metode Analytic Hierarchy Process (AHP).
 */
class AHPCrit {
    constructor() {
        this.ri = new Map([
            [1, 0.0],
            [2, 0.0],
            [3, 0.58],
            [4, 0.9],
            [5, 1.12],
            [6, 1.24],
            [7, 1.32],
            [8, 1.41],
            [9, 1.45],
            [10, 1.49],
        ]);
    }
    /**
     * Mengubah matriks string bertingkat (nested) menjadi matriks number.
     * @param matrix Matriks string atau nested matrix
     * @returns Matriks angka
     */
    static convertStringMatrixToNumber(matrix) {
        if (typeof matrix === "string")
            return (0, utils_1.convertCell)(matrix);
        if (Array.isArray(matrix)) {
            return matrix.map((item) => this.convertStringMatrixToNumber(item));
        }
        throw new Error("Invalid matrix input.");
    }
    /**
     * Menghitung ordo matriks 2D persegi.
     * Fungsi ini menganggap bahwa matriks sudah dalam bentuk angka (bukan string).
     * @param matrix Matriks 2D persegi
     * @returns Ordo matriks (jumlah baris/kolom)
     */
    static getMatrixOrders(matrix) {
        // Mengecek apakah input adalah matriks 2D dan valid
        if (!Array.isArray(matrix) ||
            matrix.length === 0 ||
            !Array.isArray(matrix[0])) {
            throw new Error("Input bukan matriks 2D.");
        }
        const n = matrix.length; // Jumlah baris
        for (let i = 0; i < n; i++) {
            // Mengecek apakah semua baris memiliki panjang yang sama
            if (matrix[i].length !== n) {
                throw new Error(`Matrix is not square at row ${i}`);
            }
        }
        return n; // Mengembalikan ordo matriks
    }
    /**
     * Menghitung total dari setiap kolom pada matriks 2D.
     * @param matrix Matriks angka 2D
     * @returns Array total dari tiap kolom
     */
    static countTotalEachColumn(matrix) {
        if (!Array.isArray(matrix) ||
            matrix.length === 0 ||
            !Array.isArray(matrix[0])) {
            throw new Error("Matrix must be a non-empty 2D array.");
        }
        const columnCount = matrix[0].length;
        const totals = new Array(columnCount).fill(0);
        for (let row = 0; row < matrix.length; row++) {
            if (matrix[row].length !== columnCount) {
                throw new Error(`Row ${row} has inconsistent column count.`);
            }
            for (let col = 0; col < columnCount; col++) {
                const value = matrix[row][col];
                if (typeof value !== "number" || isNaN(value)) {
                    throw new Error(`Invalid number at matrix[${row}][${col}].`);
                }
                totals[col] += value;
            }
        }
        return totals.map((total) => parseFloat(total.toFixed(3)));
    }
    /**
     * Menormalisasi matriks berdasarkan jumlah kolom.
     * @param matrix Matriks angka
     * @returns Matriks ternormalisasi
     */
    static normalizeMatrix(matrix) {
        const columnSums = matrix[0].map((_, colIndex) => matrix.reduce((sum, row) => sum + row[colIndex], 0));
        return matrix.map((row) => row.map((value, colIndex) => parseFloat((value / columnSums[colIndex]).toFixed(3))));
    }
    /**
     * Menghitung bobot kriteria atau eignvector dari matriks ternormalisasi.
     * simbol (w)
     * @param Matrix2D
     * @returns Array bobot lokal
     */
    static calculateCriteriaWeight(Matrix2D) {
        return Matrix2D.map((row) => {
            const sum = row.reduce((a, b) => a + b, 0);
            return parseFloat((sum / row.length).toFixed(3));
        });
    }
    /**
     * Menghitung nilai λ maks (Lamda Max) untuk matriks perbandingan berpasangan menggunakan metode AHP.
     *
     * Langkah-langkah:
     * 1. Menghitung hasil perkalian matriks perbandingan berpasangan (A) dengan vektor bobot (w).
     * 2. Membagi hasil perkalian dengan bobot masing-masing untuk mendapatkan nilai lambda untuk setiap baris.
     * 3. Menghitung rata-rata dari nilai lambda untuk memperoleh λ maks.
     *
     * @param {CritMatriks} matrix - Matriks perbandingan berpasangan (A), dimana setiap elemen A[i][j] menunjukkan perbandingan antara kriteria i dan kriteria j.
     * @param {Bobot} bobot - Vektor bobot (w), dimana setiap elemen w[i] adalah bobot dari kriteria i.
     *
     * @returns {number} λ maks - Nilai λ maks yang dihitung sebagai rata-rata dari hasil pembagian antara hasil perkalian matriks dan bobot.
     */
    static calculateLamdaMax(matrix, bobot) {
        const result = matrix.map((row) => {
            return row.reduce((acc, val, index) => acc + val * bobot[index], 0);
        });
        const lambdaValues = result.map((value, index) => value / bobot[index]);
        const lambdaMax = lambdaValues.reduce((acc, val) => acc + val, 0) / lambdaValues.length;
        return Math.round(lambdaMax * 1000) / 1000;
    }
    /**
     * Menghitung Consistency Index (CI) untuk metode AHP.
     *
     * @param {number} lambdaMax - Nilai λ maks yang telah dihitung sebelumnya.
     * @param {number} n - Jumlah kriteria (dimensi matriks perbandingan berpasangan).
     *
     * @returns {number} CI - Consistency Index yang dihitung berdasarkan rumus: CI = (λ maks - n) / (n - 1)
     */
    static calculateConsistencyIndex(lambdaMax, n) {
        const CI = (lambdaMax - n) / (n - 1);
        return Math.round(CI * 1000) / 1000;
    }
    /**
     * Menghitung Consistency Ratio (CR) dan menentukan apakah perbandingan konsisten.
     *
     * @param {number} CI - Consistency Index yang telah dihitung.
     * @param {number | undefined} RI - Random Index berdasarkan jumlah kriteria (n), bisa undefined.
     *
     * @returns {{
     *   CR: number;
     *   isConsistent: boolean;
     * }} Object berisi nilai CR dan status konsistensinya.
     */
    static calculateConsistencyRatio(CI, RI) {
        if (RI === undefined || RI === 0) {
            return { CR: 0, isConsistent: true };
        }
        const rawCR = CI / RI;
        const roundedCR = Math.round(rawCR * 1000) / 1000;
        const isConsistent = roundedCR < 0.1;
        return { CR: roundedCR, isConsistent };
    }
}
exports.AHPCrit = AHPCrit;
