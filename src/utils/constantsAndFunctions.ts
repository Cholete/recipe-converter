// Regex for input validation
const decimalRegex = /^((\d+(\.\d*)?)|(\.\d+))$/;
const fractionRegex = /^[1-9][0-9]*\/[1-9][0-9]*$/;
const mixedFracRegex = /^[1-9][0-9]*\s[1-9][0-9]*\/[1-9][0-9]*$/;

export function isDecimalOrFraction(inputToValidate: string) {
  return (
    decimalRegex.test(inputToValidate) ||
    fractionRegex.test(inputToValidate) ||
    mixedFracRegex.test(inputToValidate)
  );
}

// placedholder text for numeric fields
export const numericPlaceHolder = "e.g. 2, 1/3, 0.5, 2 1/2";
