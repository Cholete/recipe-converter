import uniqid from "uniqid";
import { Iingredient, IerrorMessages } from "./interfaces";

// Regex for input validation
const decimalRegex = /^((\d+(\.\d*)?)|(\.\d+))$/;
const fractionRegex = /^[1-9][0-9]*\/[1-9][0-9]*$/;
const mixedFracRegex = /^[1-9][0-9]*\s[1-9][0-9]*\/[1-9][0-9]*$/;

// tests using regex if a string is a decimal or fraction
export function isDecimalOrFraction(inputToValidate: string) {
  return (
    decimalRegex.test(inputToValidate) ||
    fractionRegex.test(inputToValidate) ||
    mixedFracRegex.test(inputToValidate)
  );
}

// placedholder text for numeric fields
export const numericPlaceHolder = "e.g. 2, 1/3, 0.5, 2 1/2";

// check if all fields of an ingredient(except for id and error messages) is empty
export function isIngredientEmpty(ingredient: Iingredient) {
  return !ingredient.amount && !ingredient.unit && !ingredient.name;
}

// returns error messages for an ingredient
export function validateIngredient(ingredient: Iingredient): IerrorMessages {
  const errorMessages = {
    name: "",
    amount: "",
  };

  if (!ingredient.name.trim()) {
    // empty name
    errorMessages.name = "Name is required.";
  }

  const amount = ingredient.amount.trim();
  if (!amount) {
    // empty amount
    errorMessages.amount = "Amount is required.";
  } else if (!isDecimalOrFraction(amount)) {
    // not a decimal
    errorMessages.amount = "Invalid Amount.";
  }

  return errorMessages;
}

export function createEmptyIngredient(): Iingredient {
  return {
    id: uniqid(),
    amount: "",
    unit: "",
    name: "",
    errorMessages: {
      amount: "",
      name: "",
    },
  };
}
