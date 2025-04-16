/**
 * Mengubah nilai sel string (misalnya "1/3") menjadi number.
 * @param cell Nilai string yang merepresentasikan rasio
 * @returns Nilai numerik
 */
export function convertCell(cell: string): number {
  const roundTo3Decimals = (num: number) => Math.round(num * 1000) / 1000;

  if (cell.includes("/")) {
    const [num, denom] = cell.split("/").map(Number);
    return roundTo3Decimals(num / denom);
  }

  return roundTo3Decimals(parseFloat(cell));
}
