import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Iingredient } from "../interfaces";
import SingleIngredient from "./SingleIngredient";

// Component for listing ingredients for a recipe
function AddIngredients() {
  const [newIngredient, setNewIngredient] = useState<Iingredient>({
    amount: "",
    unit: "",
    name: "",
  });
  const [ingredients, setIngredients] = useState<Iingredient[]>([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewIngredient({
      ...newIngredient,
      [e.target.name]: e.target.value,
    });
  }

  function onClickAdd() {
    setIngredients([
      ...ingredients,
      {
        amount: newIngredient.amount,
        unit: newIngredient.unit,
        name: newIngredient.name,
      },
    ]);
    setNewIngredient({
      amount: "",
      unit: "",
      name: "",
    });
  }

  return (
    <div>
      <Container maxWidth="md">
        <Typography variant="h6">Add Ingredients</Typography>
        <Stack spacing={1}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Container>
                <Typography variant="body1">Amount</Typography>
              </Container>
            </Grid>
            <Grid item xs={2}>
              <Container>
                <Typography variant="body1">unit</Typography>
              </Container>
            </Grid>
            <Grid item xs={6}>
              <Container>
                <Typography variant="body1">name</Typography>
              </Container>
            </Grid>
          </Grid>
          {ingredients.map((ingredient) => (
            <SingleIngredient ingredient={ingredient} />
          ))}
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <TextField
                required
                InputLabelProps={{ shrink: true }}
                name="amount"
                label="Amount"
                placeholder="e.g. 2, 1/2, 0.5"
                variant="outlined"
                value={newIngredient.amount}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                required
                InputLabelProps={{ shrink: true }}
                name="unit"
                label="Unit"
                placeholder="e.g. cups, tsp, tablespoon"
                variant="outlined"
                value={newIngredient.unit}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                InputLabelProps={{ shrink: true }}
                name="name"
                label="Name"
                placeholder="e.g. flour, salt, sugar"
                variant="outlined"
                value={newIngredient.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={2}>
              <Button variant="text" size="small" onClick={onClickAdd}>
                Add Ingredient
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </div>
  );
}

export default AddIngredients;
