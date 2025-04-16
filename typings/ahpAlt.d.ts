import { NestedStringMatrix } from "./types";
export declare class AHPAlt {
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
     * Menormalisasi matriks alternatif 3D berdasarkan jumlah kolom masing-masing.
     * @param matrices Matriks alternatif (3D)
     * @returns Matriks alternatif ternormalisasi (3D)
     */
    static normalizeMatrixAlt(matrices: number[][][]): number[][][];
    /**
     * Menghitung total dari setiap kolom pada matriks 3D.
     * @param matrices Matriks angka 3D
     * @returns Array total dari tiap kolom untuk setiap matriks 2D dalam 3D
     */
    static countTotalAlterEachColumn(matrices: number[][][]): number[][];
    /**
     * Menghitung bobot prioritas (priority vector) untuk setiap alternatif dalam matriks 3D.
     *
     * Untuk setiap matriks 2D dalam matriks 3D, fungsi ini menghitung rata-rata dari setiap baris
     * sebagai representasi bobot lokal (eigen vector) dari alternatif terhadap setiap kriteria.
     *
     * @param matrix3D - Matriks 3 dimensi (number[][][]) yang merepresentasikan
     *                   perbandingan berpasangan antar alternatif untuk setiap kriteria.
     *                   Dimensi: [jumlahKriteria][jumlahAlternatif][jumlahAlternatif]
     * @returns Array 2 dimensi (number[][]) yang berisi bobot prioritas untuk setiap alternatif
     *          dalam tiap kriteria. Dimensi: [jumlahKriteria][jumlahAlternatif]
     */
    static calculateCriteriaWeightAlt(matrix3D: number[][][]): number[][];
    /**
     * Menghitung lambda max dari array 3D dan bobot prioritasnya.
     * @param originalMatrix Matriks perbandingan berpasangan dalam 3D (number[][][])
     * @param priorities Array 2D bobot prioritas (1D per matriks)
     * @returns Array nilai lambda max per matriks
     */
    static calculateLambdaMax(originalMatrix: number[][][], priorities: number[][]): number[];
    /**
     * Menghitung ordo dari setiap matriks 2D dalam matriks 3D.
     * Fungsi ini menganggap bahwa setiap matriks 2D dalam matriks 3D adalah matriks persegi.
     *
     * @param originalMatrix Matriks 3D yang berisi matriks 2D.
     * @returns Array ordo matriks (jumlah baris/kolom) untuk setiap matriks 2D dalam matriks 3D.
     */
    static getMatrixOrdersForAlt(originalMatrix: number[][][]): number[];
    /**
     * Menghitung Consistency Index (CI) untuk matriks perbandingan berpasangan 3D
     * berdasarkan nilai λ max yang sudah dihitung sebelumnya.
     *
     * @param {number[]} lambdaMax - Array nilai λ max untuk setiap matriks 2D dalam 3D
     * @param {number[]} n - Array jumlah alternatif untuk setiap matriks 2D
     * @returns {number[]} Array CI untuk setiap matriks 2D dalam 3D
     */
    static calculateConsistencyIndexForAlt(lambdaMax: number[], // Array λ max
    n: number[]): number[];
    /**
     * Menghitung Consistency Ratio (CR) untuk matriks perbandingan berpasangan 3D dan menentukan apakah perbandingan konsisten.
     *
     * @param {number[]}CI  - Matriks 3D yang berisi nilai Consistency Index (CI) untuk tiap matriks 2D.
     * @param {number}RI - Array yang berisi nilai Random Index (RI) untuk tiap dimensi matriks perbandingan berpasangan.
     *
     * @returns {Array<{CR: number; isConsistent: boolean}>} - Array yang berisi objek dengan nilai CR dan status konsistensinya
     *                                                          untuk setiap matriks 2D dalam matriks 3D.
     */
    static calculateConsistencyRatios(CI: number[], RI: number): {
        CR: number;
        isConsistent: boolean;
    }[];
}
