# AHP-CALC

[![License: MIT](https://img.shields.io/npm/l/ahp-calc)](https://github.com/ren-zi-fa/ahp-calc/blob/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/ahp-calc)](https://www.npmjs.com/package/ahp-calc)
[![Downloads](https://img.shields.io/npm/dt/ahp-calc)](https://www.npmjs.com/package/ahp-calc)

A TypeScript module implementing the **Analytical Hierarchy Process (AHP)** for decision support systems.  
It supports pairwise comparison matrices, calculates priority weights, and evaluates consistency.  
Ideal for multi-criteria decision analysis (MCDA).

> ⚠️ **Note:** This library does **not** support sub-criteria (yet).

---

## 📋 Requirements

This library requires:

- A pairwise comparison matrix for the **criteria**.
- A pairwise comparison matrix for the **alternatives** with respect to **each criterion**.

---

## 📦 Installation

```bash
npm install ahp-calc

```

## Documentation

[Documentation](https://ren-zi-fa.github.io/ahp-calc/)

## Main Feature

- Support for Pairwise Comparison Matrices:
  The library allows you to create and process pairwise comparison matrices for both criteria and alternatives.

- Matrix Normalization:
  Supports normalization of both criteria and alternatives matrices to calculate relative priorities.

- Weight Calculation (bobot priority):
  It calculates local priority weights (eigenvectors) for criteria and alternatives using the normalized matrices, and it can compute the global weights across all levels.

- Consistency Evaluation:
  Includes functionality for consistency checking using λmax (Lamda Max), Consistency Index (CI), and Consistency Ratio (CR) to evaluate whether the matrix comparisons are consistent.

- Converts Nested String Matrices to Numeric Matrices:
  The library supports converting string-based matrices (nested) into numeric matrices, making it easier to process data in AHP.

- Priority Weights Calculation for Alternatives:
  For multi-alternative problems, the library supports calculating priority weights for alternatives against each criterion.

- Consistency Check for Alternatives:
  The library can evaluate the consistency of matrices for alternatives as well, using the same λmax, CI, and CR methods.

No Support for Sub-criteria:
⚠️ Currently, the library does not support sub-criteria for further hierarchical decision-making.

## Example Usage

you can start directly using function to calculate the pairwaise

for example to calculate Criteria Pairwise Comparison Matrices:

```typescript
import { calculcateCritMatrix } from "ahp-calc";

const critMatriks: string[][] = [
  ["1", "3", "5", "7", "7"],
  ["1/3", "1", "3", "5", "5"],
  ["1/5", "1/3", "1", "3", "3"],
  ["1/7", "1/5", "1/3", "1", "2"],
  ["1/7", "1/5", "1/3", "1/2", "1"],
];

const {
  normalizedMatrix,
  CI,
  CR,
  RI,
  originalMatrix,
  konsistensi,
  lamdaMax,
  sumCrit,
  n,
  weightsCriteria,
} = calculcateCritMatrix(critMatriks);
console.log({
  sumCrit,
  normalizedMatrix,
  CI,
  CR,
  RI,
  originalMatrix,
  lamdaMax,
  konsistensi,
  n,
  weightsCriteria,
});
```

for example to calculate alternatif Pairwise Comparison Matrices and if you just wan to take normalize you can do like this:

```typescript
import { calculateAltMatrix } from "ahp-calc";
const altMatrix: string[][][] = [
  [
    ["1", "3", "2", "1/3"],
    ["1/3", "1", "1/3", "1/5"],
    ["1/2", "3", "1", "1/3"],
    ["3", "5", "3", "1"],
  ],
  [
    ["1", "3", "5", "2"],
    ["1/3", "1", "3", "1/3"],
    ["1/5", "1/3", "1", "1/5"],
    ["1/2", "3", "5", "1"],
  ],
  [
    ["1", "1/3", "1/5", "1/5"],
    ["3", "1", "1/3", "1/3"],
    ["5", "3", "1", "2"],
    ["5", "3", "1/2", "1"],
  ],
  [
    ["1", "1/3", "2", "1/3"],
    ["3", "1", "3", "2"],
    ["1/2", "1/3", "1", "1/3"],
    ["3", "1/2", "3", "1"],
  ],
];

const { normalized } = calculateAltMatrix(altMatrix);

console.log(normalized);
```

Or you can start using the library by first creating an instance of the AHPCrit or AHPAlt class depending on whether you're working with criteria or alternatives.

```typescript
import { AHPCrit } from "ahp-calc";

const critMatrix = [
  [
    [1.0, 3.0, 0.2],
    [0.3333, 1.0, 0.1429],
    [5.0, 7.0, 1.0],
  ],
];

const weights = AHPCrit.calculateCriteriaWeight(critMatrix);
console.log(weights);
```

To count each column in all matriks for alternatives:

```typescript
import { AHPAlt } from "ahp-calc";

const altMatrix3D = [
  [
    [1.0, 3.0, 0.5],
    [0.3333, 1.0, 0.1429],
    [2.0, 7.0, 1.0],
  ],
  [
    [1.0, 3.0, 0.5],
    [0.3333, 1.0, 0.1429],
    [2.0, 7.0, 1.0],
  ],
  [
    [1.0, 3.0, 0.5],
    [0.3333, 1.0, 0.1429],
    [2.0, 7.0, 1.0],
  ],
];

const sumAlt = AHPAlt.countTotalAlterEachColumn(originalMatrix);
console.log(sumAlt);
```
