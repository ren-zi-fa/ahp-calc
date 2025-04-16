import { NestedStringMatrix } from "./types";
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
}
