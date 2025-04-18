import { NestedStringMatrix, StrAlternatifMatriks } from "./types";
import { convertCell } from "./utils";

export class AHPAlt {
  /**
   * Nilai Random Index (RI) berdasarkan ordo matriks.
   */
  public ri: Map<number, number>;

  constructor() {
    this.ri = new Map<number, number>([
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
  public static convertStringMatrixToNumber(matrix: NestedStringMatrix): any {
    if (typeof matrix === "string") return convertCell(matrix);
    if (Array.isArray(matrix)) {
      return matrix.map((item) => this.convertStringMatrixToNumber(item));
    }
    throw new Error("Invalid matrix input.");
  }
  /**
   * Menormalisasi matriks alternatif 3D berdasarkan jumlah kolom masing-masing.
   * @param matrices Matriks alternatif (3D)
   * @returns Matriks alternatif ternormalisasi (3D)
   */
  public static normalizeMatrixAlt(matrices: number[][][]): number[][][] {
    return matrices.map((matrix2D) => {
      const columnSums = matrix2D[0].map((_, colIndex) =>
        matrix2D.reduce((sum, row) => sum + row[colIndex], 0)
      );

      return matrix2D.map((row) =>
        row.map((value, colIndex) =>
          parseFloat((value / columnSums[colIndex]).toFixed(3))
        )
      );
    });
  }
  /**
   * Menghitung total dari setiap kolom pada matriks 3D.
   * @param matrices Matriks angka 3D
   * @returns Array total dari tiap kolom untuk setiap matriks 2D dalam 3D
   */
  public static countTotalAlterEachColumn(matrices: number[][][]): number[][] {
    if (
      !Array.isArray(matrices) ||
      matrices.length === 0 ||
      !Array.isArray(matrices[0])
    ) {
      throw new Error("Input must be a non-empty 3D array.");
    }

    // Memproses setiap matriks 2D dalam matriks 3D
    return matrices.map((matrix) => {
      if (matrix.length === 0 || !Array.isArray(matrix[0])) {
        throw new Error("Each sub-matrix must be a 2D array.");
      }

      const columnCount = matrix[0].length;
      const totals = new Array(columnCount).fill(0);

      // Hitung total kolom pada matriks 2D
      for (let row = 0; row < matrix.length; row++) {
        if (matrix[row].length !== columnCount) {
          throw new Error(
            `Row ${row} has inconsistent column count in sub-matrix.`
          );
        }

        for (let col = 0; col < columnCount; col++) {
          const value = matrix[row][col];
          if (typeof value !== "number" || isNaN(value)) {
            throw new Error(
              `Invalid number at matrix[${row}][${col}] in sub-matrix.`
            );
          }
          totals[col] += value;
        }
      }

      return totals.map((total) => parseFloat(total.toFixed(3))); // Pembulatan ke 3 desimal
    });
  }
  /**
   * Menghitung bobot prioritas (priority vector) untuk setiap alternatif dalam matriks 3D.
   *
   * Untuk setiap matriks 2D dalam matriks 3D, fungsi ini menghitung rata-rata dari setiap baris
   * sebagai representasi bobot lokal (eigen vector) dari alternatif terhadap setiap kriteria.
   *
   * @param normalize - matriks yg sudah di normalisasi
   * @returns Array 2 dimensi (number[][]) yang berisi bobot prioritas untuk setiap alternatif
   *          dalam tiap kriteria. Dimensi: [jumlahKriteria][jumlahAlternatif]
   */
  public static calculateCriteriaWeightAlt(
    normalize: number[][][]
  ): number[][] {
    return normalize.map((criteriaMatrix) => {
      const weights = criteriaMatrix.map((row) => {
        const sum = row.reduce((a, b) => a + b, 0);
        return sum / row.length;
      });

      // Optional: Normalisasi agar total bobot = 1 untuk tiap kriteria
      const total = weights.reduce((a, b) => a + b, 0);
      return weights.map((w) => w / total);
    });
  }

  /**
   * Menghitung lambda max dari array 3D dan bobot prioritasnya.
   * @param originalMatrix Matriks perbandingan berpasangan dalam 3D (number[][][])
   * @param priorities Array 2D bobot prioritas (1D per matriks)
   * @returns Array nilai lambda max per matriks
   */
  public static calculateLambdaMax(
    originalMatrix: number[][][],
    priorities: number[][]
  ): number[] {
    if (originalMatrix.length !== priorities.length) {
      throw new Error(
        "Mismatch antara jumlah matriks dan jumlah bobot prioritas."
      );
    }

    return originalMatrix.map((matrix2D, index) => {
      const weights = priorities[index];

      // Kalikan setiap baris dengan bobot prioritas, lalu jumlahkan per baris
      const weightedSums = matrix2D.map((row) =>
        row.reduce((sum, value, j) => sum + value * weights[j], 0)
      );

      // Hitung lambda max = sum(weightedSum[i] / priority[i])
      const lambda = weightedSums.reduce((sum, val, i) => {
        if (weights[i] === 0)
          throw new Error("Bobot prioritas tidak boleh nol.");
        return sum + val / weights[i];
      }, 0);

      return parseFloat((lambda / matrix2D.length).toFixed(3));
    });
  }

  /**
   * Menghitung ordo dari setiap matriks 2D dalam matriks 3D.
   * Fungsi ini menganggap bahwa setiap matriks 2D dalam matriks 3D adalah matriks persegi.
   *
   * @param originalMatrix Matriks 3D yang berisi matriks 2D.
   * @returns Array ordo matriks (jumlah baris/kolom) untuk setiap matriks 2D dalam matriks 3D.
   */
  public static getMatrixOrdersForAlt(originalMatrix: number[][][]): number[] {
    // Mengecek apakah input adalah matriks 3D yang valid
    if (!Array.isArray(originalMatrix) || originalMatrix.length === 0) {
      throw new Error("Input bukan matriks 3D.");
    }

    return originalMatrix.map((matrix2D, index) => {
      // Mengecek apakah setiap matriks 2D adalah matriks persegi (square matrix)
      if (
        !Array.isArray(matrix2D) ||
        matrix2D.length === 0 ||
        !Array.isArray(matrix2D[0])
      ) {
        throw new Error(`Matriks 2D pada index ${index} tidak valid.`);
      }

      const n = matrix2D.length; // Jumlah baris pada matriks 2D
      for (let i = 0; i < n; i++) {
        // Mengecek apakah setiap baris dalam matriks 2D memiliki panjang yang sama
        if (matrix2D[i].length !== n) {
          throw new Error(
            `Matriks 2D pada index ${index} bukan matriks persegi pada baris ${i}.`
          );
        }
      }

      return n; // Mengembalikan ordo matriks 2D
    });
  }
  /**
   * Menghitung Consistency Index (CI) untuk matriks perbandingan berpasangan 3D
   * berdasarkan nilai λ max yang sudah dihitung sebelumnya.
   *
   * @param {number[]} lambdaMax - Array nilai λ max untuk setiap matriks 2D dalam 3D
   * @param {number[]} n - Array jumlah alternatif untuk setiap matriks 2D
   * @returns {number[]} Array CI untuk setiap matriks 2D dalam 3D
   */
  public static calculateConsistencyIndexForAlt(
    lambdaMax: number[], // Array λ max
    n: number[] // Array jumlah alternatif untuk setiap matriks 2D
  ): number[] {
    return lambdaMax.map((lambda, index) => {
      const currentN = n[index]; // Ambil jumlah alternatif (n) untuk matriks 2D ini
      const CI = (lambda - currentN) / (currentN - 1); // CI berdasarkan rumus
      return parseFloat(CI.toFixed(3)); // Pembulatan ke 3 desimal
    });
  }
  /**
   * Menghitung Consistency Ratio (CR) untuk matriks perbandingan berpasangan 3D dan menentukan apakah perbandingan konsisten.
   *
   * @param {number[]}CI  - Matriks 3D yang berisi nilai Consistency Index (CI) untuk tiap matriks 2D.
   * @param {number}RI - Array yang berisi nilai Random Index (RI) untuk tiap dimensi matriks perbandingan berpasangan.
   *
   * @returns {Array<{CR: number; isConsistent: boolean}>} - Array yang berisi objek dengan nilai CR dan status konsistensinya
   *                                                          untuk setiap matriks 2D dalam matriks 3D.
   */
  public static calculateConsistencyRatios(
    CI: number[],
    RI: number
  ): { CR: number; isConsistent: boolean }[] {
    return CI.map((ci) => {
      if (RI === 0 || RI === undefined) {
        return { CR: 0, isConsistent: true };
      }

      const rawCR = ci / RI;
      const roundedCR = Math.round(rawCR * 1000) / 1000;
      const isConsistent = roundedCR < 0.1;

      return { CR: roundedCR, isConsistent };
    });
  }
}
