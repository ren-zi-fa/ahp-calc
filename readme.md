# AHPClient

A TypeScript library implementing the **Analytical Hierarchy Process (AHP)** for decision support systems. It supports pairwise comparison matrices, calculates priority weights, and assesses consistency across matrices. This library is particularly suitable for multi-criteria decision analysis.

## ✨ Features

- Parses matrix values written as fractions (e.g., `"1/3"`, `"5"`)
- Computes priority weights using the geometric mean method
- Evaluates consistency via lambda max, consistency index (CI), and consistency ratio (CR)
- Supports multiple matrices for evaluating alternatives against several criteria

## 📦 Installation

> Not yet available on npm. You can import directly from source:
```ts
type MatrixType = string[][];
[
  ['1', '1/3', '3'],
  ['3', '1', '5'],
  ['1/3', '1/5', '1']
]

type AltMatrixes = MatrixType[];

const ahp = new AHPClient();

const matrix: MatrixType = [
  ['1', '1/3', '3'],
  ['3', '1', '5'],
  ['1/3', '1/5', '1']
];

const result = ahp.calcMatrixResults(matrix);
console.log(result);
🧠 API Reference
checkIsSlash(str: string): boolean | undefined
Determines whether a given string is a valid fractional format (e.g., "1/3"). Returns true if valid, false otherwise.

convertMatrix(matrix: MatrixType): ConvertedMatrixResult
Parses a string-based matrix into numerical form. Returns an error flag if any value cannot be parsed.

calcPriority(matrix: ConvertedMatrix): number[]
Calculates the priority vector (weights) using the geometric mean method for each row.

calcIntensity(matrix: ConvertedMatrix, w: number[]): number[]
Multiplies each row in the matrix by the priority vector to generate the intensity vector.

calcFraction(w: number[], intensity: number[]): number[]
Computes the consistency fraction by dividing each intensity by its corresponding weight.

calcLambda(fraction: number[]): number
Computes the average of the consistency fractions, referred to as λ_max.

calcInd(lambda: number, length: number): number
Calculates the Consistency Index (CI) based on λ_max and the size of the matrix.

calcRelativeCoherence(ind: number, consistInd: number): number
Computes the Consistency Ratio (CR) by dividing CI by the corresponding Random Index (RI).

calcMatrixResults(matrix: MatrixType): CalcMatrixResult | string
Executes a complete AHP calculation for a single comparison matrix. Returns either the result or an error message.

calcResults(matrixes: AltMatrixes): CalcAllMatrixResult | string
Performs AHP calculation for multiple matrices (e.g., alternatives across multiple criteria) and computes the global priority vector. Also identifies the most favorable alternative based on weights.

⚠️ Error Handling
In the event of malformed inputs (e.g., 1/2, invalid structure)

ts
Copy
Edit
"Something went wrong"
🛠 Example Output
ts
Copy
Edit
{
  w: [0.236, 0.648, 0.116],
  intensity: [0.743, 1.926, 0.346],
  fraction: [3.148, 2.972, 2.983],
  lambda: 3.034,
  ind: 0.017,
  coherence: 0.019,
  consistInd: 0.58
}

