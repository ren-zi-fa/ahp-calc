# AHP-CALC

## A TypeScript library implementing the **Analytical Hierarchy Process (AHP)** for decision support systems. It supports pairwise comparison matrices, calculates priority weights, and evaluates consistency. Ideal for multi-criteria decision analysis (MCDA).

## 📦 Installation

```bash
npm install ahp-calc

```

### USAGE EXAMPLE

import { AHPClient } from 'ahp-calc';

const matrix: string[][] = [
['1', '1/3', '3'],
['3', '1', '5'],
['1/3', '1/5', '1']
];

const result = AHP.calcResults(matrix);

console.log(result);

### EXAMPLE MATRIX

[
['1', '1/3', '3' ],
['3', '1', '5' ],
['1/3', '1/5', '1' ]
]

## ERROR HANDLING

"Something went wrong"
