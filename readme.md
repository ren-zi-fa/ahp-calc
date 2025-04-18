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

const originalMatrix = [
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

Ranks alternatif

```typescript
const { weightsCriteria } = calculcateCritMatrix(critMatriks);
const { weightAlt } = calculateAltMatrix(altMatrix);
const res = calculateCompositeWeights(weightAlt, weightsCriteria);
console.log(res);
```

# 📊 Example AHP Calculation Output

This is an example output from running a criteria comparison using the AHP (Analytic Hierarchy Process) method:

## 🔢 Input Matrix (Pairwise Comparisons)

| 0     | 1     | 2     | 3   | 4   |
| ----- | ----- | ----- | --- | --- |
| 1     | 3     | 5     | 7   | 7   |
| 0.333 | 1     | 3     | 5   | 5   |
| 0.2   | 0.333 | 1     | 3   | 3   |
| 0.143 | 0.2   | 0.333 | 1   | 2   |
| 0.143 | 0.2   | 0.333 | 0.5 | 1   |

## 📉 Normalized Matrix

| 0      | 1      | 2      | 3      | 4      |
| ------ | ------ | ------ | ------ | ------ |
| 0.5498 | 0.6338 | 0.5173 | 0.4242 | 0.3889 |
| 0.1831 | 0.2113 | 0.3104 | 0.3030 | 0.2778 |
| 0.1100 | 0.0704 | 0.1035 | 0.1818 | 0.1667 |
| 0.0786 | 0.0423 | 0.0345 | 0.0606 | 0.1111 |
| 0.0786 | 0.0423 | 0.0345 | 0.0303 | 0.0556 |

## ⚖️ Calculated Weights

These represent the relative importance of each criterion:

| Weight |
| ------ |
| 0.4535 |
| 0.2826 |
| 0.1486 |
| 0.0725 |
| 0.0429 |

## 📈 Summary

- **Column Totals (for normalization):** `[1.819, 4.733, 9.666, 16.5, 18]`
- **λ max:** `5.277`
- **Consistency Index (CI):** `0.069`
- **Consistency Ratio (CR):** `0.062`
- **Random Index (RI):** `1.12`
- ✅ **Consistency Check:** Matrix is consistent (CR ≤ 0.1)
- **Number of criteria:** `5`

---

# AHP Alternative Calculation Results

## Matrix Order (n):

[ 4, 4, 4, 4, 4 ]

## Original Matrices:

- **Matrix [0]:**

| (index) | 0     | 1   | 2     | 3     |
| ------- | ----- | --- | ----- | ----- |
| 0       | 1     | 3   | 2     | 0.333 |
| 1       | 0.333 | 1   | 0.333 | 0.2   |
| 2       | 0.5   | 3   | 1     | 0.333 |
| 3       | 3     | 5   | 3     | 1     |

- **Matrix [1]:**

| (index) | 0     | 1     | 2   | 3     |
| ------- | ----- | ----- | --- | ----- |
| 0       | 1     | 3     | 5   | 2     |
| 1       | 0.333 | 1     | 3   | 0.333 |
| 2       | 0.2   | 0.333 | 1   | 0.2   |
| 3       | 0.5   | 3     | 5   | 1     |

- **Matrix [2]:**

| (index) | 0   | 1     | 2     | 3     |
| ------- | --- | ----- | ----- | ----- |
| 0       | 1   | 0.333 | 0.2   | 0.2   |
| 1       | 3   | 1     | 0.333 | 0.333 |
| 2       | 5   | 3     | 1     | 2     |
| 3       | 5   | 3     | 0.5   | 1     |

- **Matrix [3]:**

| (index) | 0   | 1     | 2   | 3     |
| ------- | --- | ----- | --- | ----- |
| 0       | 1   | 0.333 | 2   | 0.333 |
| 1       | 3   | 1     | 3   | 2     |
| 2       | 0.5 | 0.333 | 1   | 0.333 |
| 3       | 3   | 0.5   | 3   | 1     |

- **Matrix [4]:**

| (index) | 0     | 1   | 2   | 3   |
| ------- | ----- | --- | --- | --- |
| 0       | 1     | 3   | 3   | 3   |
| 1       | 0.333 | 1   | 2   | 2   |
| 2       | 0.333 | 0.5 | 1   | 2   |
| 3       | 0.333 | 0.5 | 0.5 | 1   |

## Normalized Matrices:

- **Matrix [0]:**

| (index) | 0     | 1     | 2     | 3     |
| ------- | ----- | ----- | ----- | ----- |
| 0       | 0.207 | 0.25  | 0.316 | 0.178 |
| 1       | 0.069 | 0.083 | 0.053 | 0.107 |
| 2       | 0.103 | 0.25  | 0.158 | 0.178 |
| 3       | 0.621 | 0.417 | 0.474 | 0.536 |

- **Matrix [1]:**

| (index) | 0     | 1     | 2     | 3     |
| ------- | ----- | ----- | ----- | ----- |
| 0       | 0.492 | 0.409 | 0.357 | 0.566 |
| 1       | 0.164 | 0.136 | 0.214 | 0.094 |
| 2       | 0.098 | 0.045 | 0.071 | 0.057 |
| 3       | 0.246 | 0.409 | 0.357 | 0.283 |

- **Matrix [2]:**

| (index) | 0     | 1     | 2     | 3     |
| ------- | ----- | ----- | ----- | ----- |
| 0       | 0.071 | 0.045 | 0.098 | 0.057 |
| 1       | 0.214 | 0.136 | 0.164 | 0.094 |
| 2       | 0.357 | 0.409 | 0.492 | 0.566 |
| 3       | 0.357 | 0.409 | 0.246 | 0.283 |

- **Matrix [3]:**

| (index) | 0     | 1     | 2     | 3     |
| ------- | ----- | ----- | ----- | ----- |
| 0       | 0.133 | 0.154 | 0.222 | 0.091 |
| 1       | 0.4   | 0.462 | 0.333 | 0.546 |
| 2       | 0.067 | 0.154 | 0.111 | 0.091 |
| 3       | 0.4   | 0.231 | 0.333 | 0.273 |

- **Matrix [4]:**

| (index) | 0     | 1   | 2     | 3     |
| ------- | ----- | --- | ----- | ----- |
| 0       | 0.5   | 0.6 | 0.462 | 0.375 |
| 1       | 0.167 | 0.2 | 0.308 | 0.25  |
| 2       | 0.167 | 0.1 | 0.154 | 0.25  |
| 3       | 0.167 | 0.1 | 0.077 | 0.125 |

## Column Totals for Each Alternative:

- Column Total [0]: [ '4.833', '12.000', '6.333', '1.866' ]
- Column Total [1]: [ '2.033', '7.333', '14.000', '3.533' ]
- Column Total [2]: [ '14.000', '7.333', '2.033', '3.533' ]
- Column Total [3]: [ '7.500', '2.166', '9.000', '3.666' ]
- Column Total [4]: [ '1.999', '5.000', '6.500', '8.000' ]

## Weights from Alternative Matrices:

- **Weight [0]:** [ '0.253', '0.075', '0.193', '0.479' ]
- **Weight [1]:** [ '0.409', '0.173', '0.064', '0.353' ]
- **Weight [2]:** [ '0.064', '0.173', '0.409', '0.353' ]
- **Weight [3]:** [ '0.164', '0.403', '0.097', '0.336' ]
- **Weight [4]:** [ '0.465', '0.248', '0.178', '0.109' ]

## Lambda Max:

[ '4.132', '4.148', '4.148', '4.152', '4.140' ]

## Consistency Index (CI):

[ '0.044', '0.049', '0.049', '0.051', '0.047' ]

## Random Index (RI): 0.9

## Consistency Ratio (CR):

- **CR [0]:** 0.049 → Consistent? ✅ Yes
- **CR [1]:** 0.054 → Consistent? ✅ Yes
- **CR [2]:** 0.054 → Consistent? ✅ Yes
- **CR [3]:** 0.057 → Consistent? ✅ Yes
- **CR [4]:** 0.052 → Consistent? ✅ Yes

## Overall Consistency Status: ✅ All Consistent

# CONTRIBUTING

please read our to start contribute [Contributing Guidelines](https://github.com/ren-zi-fa/ahp-calc/blob/main/CONTRIBUTING.md).
