export function parseCalculation(calculation) {
  if (calculation.length === 1) {
    const resultStr = calculation[0].toString();
    return resultStr;
  }
  if (calculation.indexOf('*') !== -1) {
    const op = calculation.indexOf('*');
    const result = calculation[op-1] * calculation[op+1]
    calculation.splice(op -1, 3, result)
    return parseCalculation(calculation);
  }
  if (calculation.indexOf('/') !== -1) {
    const op = calculation.indexOf('/');
    const result = calculation[op-1] / calculation[op+1]
    calculation.splice(op -1, 3, result)
    return parseCalculation(calculation);
  }
  if (calculation.indexOf('+') !== -1) {
    const op = calculation.indexOf('+');
    const result = calculation[op-1] + calculation[op+1]
    calculation.splice(op -1, 3, result)
    return parseCalculation(calculation);
  }
  if (calculation.indexOf('-') !== -1) {
    const op = calculation.indexOf('-');
    const result = calculation[op-1] - calculation[op+1]
    calculation.splice(op -1, 3, result)
    return parseCalculation(calculation);
  }
  else return calculation;
}
