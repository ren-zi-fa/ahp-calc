import { calculateAltMatrix } from "../lib/method";
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

const {
  CR,
  Ci,
  RI,
  isConsistent,
  lamdaMax,
  n,
  normalized,
  originalMatrix,
  sumAlt,
  weightAlt,
} = calculateAltMatrix(altMatrix);

console.log("===== Hasil Perhitungan AHP Alternatif =====\n");

console.log("🔢 Ordo Matriks (n):", n);
console.log("\n📋 Matriks Asli:");
originalMatrix.forEach((matrix, i) => {
  console.log(`  - Matriks [${i}]:`);
  console.table(matrix);
});

console.log("\n📊 Matriks Normalisasi:");
normalized.forEach((matrix, i) => {
  console.log(`  - Matriks [${i}]:`);
  console.table(matrix);
});

console.log("\n🧮 Jumlah Tiap Kolom Alternatif:");
sumAlt.forEach((sum, i) => {
  console.log(
    `  - Kolom Total [${i}]:`,
    sum.map((v) => v.toFixed(3))
  );
});

console.log("\n📉 Bobot dari Matriks Alt:");
weightAlt.forEach((w, i) => {
  console.log(
    `  - Weight [${i}]:`,
    w.map((v) => v.toFixed(3))
  );
});

console.log("\n🧠 Lambda Max:");
console.log(lamdaMax.map((v) => v.toFixed(3)));

console.log("\n🧮 Consistency Index (CI):");
console.log(Ci.map((v) => v.toFixed(3)));

console.log("\n🎲 Random Index (RI):", RI);

console.log("\n📏 Consistency Ratio (CR):");
CR.forEach((ratio, i) => {
  console.log(
    `  - CR [${i}]: ${ratio.CR.toFixed(3)} → Konsisten? ${
      ratio.isConsistent ? "✅ Ya" : "❌ Tidak"
    }`
  );
});

console.log(
  "\n🟢 Status Konsistensi Total:",
  isConsistent.every((x) => x)
    ? "✅ Semua Konsisten"
    : "❌ Ada yang Tidak Konsisten"
);
