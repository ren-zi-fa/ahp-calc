"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertCell = convertCell;
/**
 * Mengubah nilai sel string (misalnya "1/3") menjadi number.
 * @param cell Nilai string yang merepresentasikan rasio
 * @returns Nilai numerik
 */
function convertCell(cell) {
    const roundTo3Decimals = (num) => Math.round(num * 1000) / 1000;
    if (cell.includes("/")) {
        const [num, denom] = cell.split("/").map(Number);
        return roundTo3Decimals(num / denom);
    }
    return roundTo3Decimals(parseFloat(cell));
}
