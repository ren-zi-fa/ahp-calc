# AHPClient

A TypeScript library implementing the **Analytical Hierarchy Process (AHP)** for decision support systems. It supports pairwise comparison matrices, calculates priority weights, and evaluates consistency. Ideal for multi-criteria decision analysis (MCDA).

---

## ✨ Features

- ✅ Parses values in string format, including fractions (e.g., `"1/3"`, `"5"`)
- 🧮 Calculates priority weights via the geometric mean method
- 🔍 Measures consistency: λ<sub>max</sub>, Consistency Index (CI), and Consistency Ratio (CR)
- 🧠 Supports multiple matrices for criteria and alternatives evaluation

---

## 📦 Installation

```bash
npm install ahp-calc

```

### USAGE EXAMPLE

import { AHPClient } from 'ahp-renz';

const matrix: string[][] = [
['1', '1/3', '3'],
['3', '1', '5'],
['1/3', '1/5', '1']
];

const ahp = new AHPClient();
const result = ahp.calcMatrixResults(matrix);

console.log(result);

### EXAMPLE MATRIX

[
['1', '1/3', '3' ],
['3', '1', '5' ],
['1/3', '1/5', '1' ]
]

# 🧠 API Reference

checkIsSlash(str: string): boolean | undefined
Check if a string is a valid fraction (e.g., "1/3"). Returns true or false.

convertMatrix(matrix: MatrixType): ConvertedMatrixResult
Converts string-based matrix into numerical matrix. Handles parsing errors.

calcPriority(matrix: ConvertedMatrix): number[]
Computes priority weights using the geometric mean for each row.

calcIntensity(matrix: ConvertedMatrix, w: number[]): number[]
Multiplies each matrix row by its priority to get the intensity vector.

calcFraction(w: number[], intensity: number[]): number[]
Calculates consistency fraction: intensity[i] / weight[i].

calcLambda(fraction: number[]): number
Calculates λ<sub>max</sub>: the mean of the consistency fraction vector.

calcInd(lambda: number, length: number): number
Calculates Consistency Index (CI): (λ_max - n) / (n - 1).

calcRelativeCoherence(ind: number, consistInd: number): number
Computes Consistency Ratio (CR): CI / RI.

calcMatrixResults(matrix: MatrixType): CalcMatrixResult | string
Performs full AHP process for a single matrix. Returns result or error.

calcResults(matrixes: AltMatrixes): CalcAllMatrixResult | string
Calculates global priority vector across multiple matrices.

## ERROR HANDLING

"Something went wrong"

# EXAMPLE OUTPUT

{
w: [0.236, 0.648, 0.116],
intensity: [0.743, 1.926, 0.346],
fraction: [3.148, 2.972, 2.983],
lambda: 3.034,
ind: 0.017,
coherence: 0.019,
consistInd: 0.58
}
