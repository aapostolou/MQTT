export const isTypeOf = (variable) =>
  Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();

export const mapToValues = (
  current,
  min,
  max,
  targetMin = 0,
  targetMax = 100
) => ((current - min) * (targetMax - targetMin)) / (max - min) + targetMin;
