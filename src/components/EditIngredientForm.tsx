import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Iingredient } from "../utils/interfaces";

export interface IEditIngredientFormProps {
  deleteIngredient(id: string): void;
  editIngredient(ingredient: Iingredient): void;
  ingredient: Iingredient;
}

function EditIngredientForm(props: IEditIngredientFormProps) {
  const { ingredient, deleteIngredient, editIngredient } = props;

  function handleIngredientChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newIngredient = {
      ...ingredient,
      [e.target.name]: e.target.value,
    };
    editIngredient(newIngredient);
  }

  function onClickDelete() {
    deleteIngredient(ingredient.id);
  }

  return (
    <Grid container columnSpacing={1}>
      <Grid item xs={2.6}>
        <TextField
          required
          InputLabelProps={{ shrink: true }}
          name="amount"
          label="Amount"
          variant="outlined"
          value={ingredient.amount}
          onChange={handleIngredientChange}
          error={ingredient.errorMessages.amount !== ""}
          helperText={ingredient.errorMessages.amount}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          InputLabelProps={{ shrink: true }}
          name="unit"
          label="Unit"
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
          variant="outlined"
          value={ingredient.name}
          onChange={handleIngredientChange}
          error={ingredient.errorMessages.name !== ""}
          helperText={ingredient.errorMessages.name}
        />
      </Grid>
      <Grid item xs={3}>
        <Button variant="text" size="small" onClick={onClickDelete}>
          DELETE
        </Button>
      </Grid>
    </Grid>
  );
}

export default EditIngredientForm;
