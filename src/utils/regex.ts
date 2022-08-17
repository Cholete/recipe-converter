const decimalRegex = /^((\d+(\.\d*)?)|(\.\d+))$/;

const fractionRegex = /^[1-9][0-9]*\/[1-9][0-9]*$/;

export default function isDecimalOrFraction(inputToValidate: string) {
  return (
    decimalRegex.test(inputToValidate) || fractionRegex.test(inputToValidate)
  );
}
