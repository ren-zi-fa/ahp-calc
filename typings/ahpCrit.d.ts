/**
 * AHP (Analytic Hierarchy Process) class untuk menghitung bobot dan konsistensi matriks perbandingan berpasangan.
 * Mendukung konversi nilai string ke number, normalisasi matriks, perhitungan bobot lokal/global, dan uji konsistensi tidak mendukung sub kriteriia.
 *
 * @module AHP
 */
import { Bobot, CritMatriks, NestedStringMatrix } from "./types";
/**
 * Kelas utama untuk mengimplementasikan metode Analytic Hierarchy Process (AHP).
 */
export declare class AHPCrit {
    /**
     * Nilai Random Index (RI) berdasarkan ordo matriks.
     */
    ri: Map<number, number>;
    constructor();
    /**
     * Mengubah matriks string bertingkat (nested) menjadi matriks number.
     * @param matrix Matriks string atau nested matrix
     * @returns Matriks angka
     */
    static convertStringMatrixToNumber(matrix: NestedStringMatrix): any;
    /**
     * Menghitung ordo matriks 2D persegi.
     * Fungsi ini menganggap bahwa matriks sudah dalam bentuk angka (bukan string).
     * @param matrix Matriks 2D persegi
     * @returns Ordo matriks (jumlah baris/kolom)
     */
    static getMatrixOrders(matrix: number[][]): number;
    /**
     * Menghitung total dari setiap kolom pada matriks 2D.
     * @param matrix Matriks angka 2D
     * @returns Array total dari tiap kolom
     */
    static countTotalEachColumn(matrix: number[][]): number[];
    /**
     * Menormalisasi matriks berdasarkan jumlah kolom.
     * @param matrix Matriks angka
     * @returns Matriks ternormalisasi
     */
    static normalizeMatrix(matrix: number[][]): number[][];
    /**
     * Menghitung bobot kriteria atau eignvector dari matriks ternormalisasi.
     * simbol (w)
     * @param normalize
     * @returns Array priority
     */
    static calculateCriteriaWeight(normalize: number[][]): number[];
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
    static calculateLamdaMax(matrix: CritMatriks, bobot: Bobot): number;
    /**
     * Menghitung Consistency Index (CI) untuk metode AHP.
     *
     * @param {number} lambdaMax - Nilai λ maks yang telah dihitung sebelumnya.
     * @param {number} n - Jumlah kriteria (dimensi matriks perbandingan berpasangan).
     *
     * @returns {number} CI - Consistency Index yang dihitung berdasarkan rumus: CI = (λ maks - n) / (n - 1)
     */
    static calculateConsistencyIndex(lambdaMax: number, n: number): number;
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
    static calculateConsistencyRatio(CI: number, RI: number | undefined): {
        CR: number;
        isConsistent: boolean;
    };
}
