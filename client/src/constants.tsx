export const getToTwoDecimalPlaces = (num: number) =>
  (Math.round((num + Number.EPSILON) * 100) / 100).toFixed(2);
