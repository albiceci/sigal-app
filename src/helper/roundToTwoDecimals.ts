export function roundToTwoDecimals(num: number | string) {
  let value = num;
  if (typeof num === "string") {
    value = Number(num);
  }
  return Math.round((value as number) * 100) / 100;
}
