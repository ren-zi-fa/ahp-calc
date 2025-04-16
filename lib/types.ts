/**
 * Tipe data untuk Matriks yang terdiri dari array 2 dimensi berisi angka (`number[][]`),
 * atau sebuah array dari Matriks yang bersarang (rekursif) bertipe `Matrix[]`.
 *
 * @example
 * // Matriks 2 dimensi
 * const matrix: Matrix = [[1, 2], [3, 4]];
 *
 * // Matriks bersarang
 * const nestedMatrix: Matrix = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]];
 */
type Matrix = number[][] | Matrix[];

/**
 * Tipe data untuk Matriks yang bersifat string, yang dapat berupa string tunggal atau array dari
 * `NestedStringMatrix` yang bersarang.
 *
 * @example
 * // Matriks string tunggal
 * const matrix: NestedStringMatrix = "1/2";
 *
 * // Matriks string bersarang
 * const nestedMatrix: NestedStringMatrix = [["1/2", "3/4"], ["5/6", "7/8"]];
 */
type NestedStringMatrix = string | NestedStringMatrix[];

/**
 * Tipe data untuk array yang berisi bobot-bobot yang masing-masing bertipe `number`.
 *
 * @example
 * // Contoh array bobot
 * const weights: Weights = [0.2, 0.3, 0.5];
 */
type Weights = number[];

/**
 * Tipe data untuk Matriks yang telah dinormalisasi, yang berisi array 2 dimensi bertipe `number[][]`.
 *
 * @example
 * // Matriks ter-normalkan
 * const normalized: Normalize = [[0.1, 0.2], [0.3, 0.4]];
 */
type Normalize = number[][];

type CritMatriks = number[][];
type Bobot = number[];

type AHPCritResult = {
  convertedMatrix: number[][];
  normalizedMatrix: number[][];
  weightsCriteria: number[];
  lamdaMax: number;
  n: number;
  CI: number;
  RI: number;
  CR: number;
  konsistensi: string;
  sumCrit: number[] | number[][];
};
export type {
  Matrix,
  Normalize,
  NestedStringMatrix,
  Weights,
  CritMatriks,
  Bobot,
  AHPCritResult,
};
