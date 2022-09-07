import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Iingredient } from "../utils/interfaces";
import {
  numericPlaceHolder,
  isDecimalOrFraction,
} from "../utils/constantsAndFunctions";

export interface IEditIngredientFormProps {
  saveIngredient(ingredient: Iingredient): void;
}

function EditIngredientForm(props: IEditIngredientFormProps) {
  const { saveIngredient } = props;
  const [ingredient, setIngredient] = useState<Iingredient>({
    amount: "",
    unit: "",
    name: "",
    id: "",
  });
  const [ingError, setIngError] = useState({
    name: false,
    amount: false,
  });
  const [ingErrorMsg, setIngErrorMsg] = useState({
    name: "",
    amount: "",
  });

  function validate() {
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

  function handleIngredientChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIngredient({
      ...ingredient,
      [e.target.name]: e.target.value,
    });
  }

  function onClickSave() {
    const errorMessages = validate();
    const newError = {
      name: errorMessages.name.length !== 0,
      amount: errorMessages.amount.length !== 0,
    };

    setIngError(newError);
    // no error
    if (!Object.values(newError).includes(true)) {
      saveIngredient(ingredient);
      // clear fields
      setIngredient({
        amount: "",
        unit: "",
        name: "",
        id: "",
      });

      // removing error messages
      setIngError({
        amount: false,
        name: false,
      });
      setIngErrorMsg({
        amount: "",
        name: "",
      });
    } else {
      setIngErrorMsg(errorMessages);
    }
  }

  return (
    <Grid container columnSpacing={1}>
      <Grid item xs={2.6}>
        <TextField
          required
          InputLabelProps={{ shrink: true }}
          name="amount"
          label="Amount"
          placeholder={numericPlaceHolder}
          variant="outlined"
          value={ingredient.amount}
          onChange={handleIngredientChange}
          error={ingError.amount}
          helperText={ingErrorMsg.amount}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          InputLabelProps={{ shrink: true }}
          name="unit"
          label="Unit"
          placeholder="e.g. cups, tsp, tablespoon"
          variant="outlined"
          value={ingredient.unit}
          onChange={handleIngredientChange}
        />
      </Grid>
      <Grid item xs={3.4}>
        <TextField
          required
          InputLabelProps={{ shrink: true }}
          name="name"
          label="Name"
          placeholder="e.g. flour, salt, sugar"
          variant="outlined"
          value={ingredient.name}
          onChange={handleIngredientChange}
          error={ingError.name}
          helperText={ingErrorMsg.name}
        />
      </Grid>
      <Grid item xs={3}>
        <Button variant="text" size="small" onClick={onClickSave}>
          SAVE
        </Button>
      </Grid>
    </Grid>
  );
}

export default EditIngredientForm;
