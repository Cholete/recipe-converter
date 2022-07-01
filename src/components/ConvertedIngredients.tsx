import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useLocation, Link } from "react-router-dom";
import { Iingredient } from "../interfaces";

interface Istate {
  ingredients: Iingredient[];
  multiplier: string;
}

// component to display the converted amount of ingredients
function ConvertedIngredients() {
  const location = useLocation();
  const { ingredients, multiplier } = location.state as Istate;

  // for the converted ingredients displayed
  const [currentMultiplier, setCurrentMultiplier] = useState(multiplier);

  // for the change multiplier text box
  const [newMultiplier, setNewMultiplier] = useState("");

  function handleMultiplierChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewMultiplier(e.target.value);
  }

  function onClickChangeMultiplier() {
    setCurrentMultiplier(newMultiplier);
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h6">
            Converted Ingredients(Multiplier: {currentMultiplier})
          </Typography>
          {ingredients.map((ingredient) => (
            <Typography variant="body1">
              {Number(currentMultiplier) * Number(ingredient.amount)}{" "}
              {ingredient.unit} {ingredient.name}
            </Typography>
          ))}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Original Ingredients</Typography>
          {ingredients.map((ingredient) => (
            <Typography variant="body1">
              {ingredient.amount} {ingredient.unit} {ingredient.name}
            </Typography>
          ))}
        </Grid>
      </Grid>
      <Stack sx={{ mt: 5 }} direction="row" spacing={2}>
        <TextField
          required
          InputLabelProps={{ shrink: true }}
          name="multiplier"
          label="Multiplier(in decimal)"
          placeholder="e.g. 2, 0.5, .33"
          variant="outlined"
          type="number"
          value={newMultiplier}
          onChange={handleMultiplierChange}
        />
        <Button variant="contained" onClick={onClickChangeMultiplier}>
          Change Multiplier
        </Button>
      </Stack>
      <Link to="/" state={{ ingredients, multiplier }}>
        <Button sx={{ mt: 5 }} variant="contained">
          Convert Another Recipe
        </Button>
      </Link>
    </Container>
  );
}

export default ConvertedIngredients;
