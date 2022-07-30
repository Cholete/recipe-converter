import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import uniqid from "uniqid";
import { Iingredient } from "../interfaces";
import SingleIngredient from "./SingleIngredient";

// Component for listing ingredients for a recipe
function AddIngredients() {
  const [newIngredient, setNewIngredient] = useState<Iingredient>({
    amount: "",
    unit: "",
    name: "",
    id: "",
  });
  const [multiplier, setMultiplier] = useState("1");
  const [ingredients, setIngredients] = useState<Iingredient[]>([]);

  function handleNewIngredientChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewIngredient({
      ...newIngredient,
      [e.target.name]: e.target.value,
    });
  }

  function handleMultiplierChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMultiplier(e.target.value);
  }

  function onClickAdd() {
    setIngredients([
      ...ingredients,
      {
        amount: newIngredient.amount,
        unit: newIngredient.unit,
        name: newIngredient.name,
        id: uniqid(),
      },
    ]);
    setNewIngredient({
      amount: "",
      unit: "",
      name: "",
      id: "",
    });
  }

  function deleteIngredient(id: string) {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
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
            <SingleIngredient
              key={ingredient.id}
              ingredient={ingredient}
              deleteIngredient={deleteIngredient}
            />
          ))}
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <TextField
                required
                InputLabelProps={{ shrink: true }}
                name="amount"
                label="Amount(in decimal)"
                placeholder="e.g. 2, 0.5, .33"
                variant="outlined"
                value={newIngredient.amount}
                type="number"
                onChange={handleNewIngredientChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                InputLabelProps={{ shrink: true }}
                name="unit"
                label="Unit"
                placeholder="e.g. cups, tsp, tablespoon"
                variant="outlined"
                value={newIngredient.unit}
                onChange={handleNewIngredientChange}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                required
                InputLabelProps={{ shrink: true }}
                name="name"
                label="Name"
                placeholder="e.g. flour, salt, sugar"
                variant="outlined"
                value={newIngredient.name}
                onChange={handleNewIngredientChange}
              />
            </Grid>
            <Grid item xs={3}>
              <Button variant="text" size="small" onClick={onClickAdd}>
                Add Ingredient
              </Button>
            </Grid>
          </Grid>
        </Stack>
        <Stack spacing={2} direction="row" mt={8}>
          <TextField
            required
            InputLabelProps={{ shrink: true }}
            name="multiplier"
            label="Multiplier(in decimal)"
            placeholder="e.g. 2, 0.5, .33"
            variant="outlined"
            type="number"
            value={multiplier}
            onChange={handleMultiplierChange}
          />
          <Link to="/convert" state={{ ingredients, multiplier }}>
            <Button variant="contained">Convert Ingredients</Button>
          </Link>
        </Stack>
      </Container>
    </div>
  );
}

export default AddIngredients;
