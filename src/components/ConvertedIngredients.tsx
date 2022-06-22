import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import { Iingredient } from "../interfaces";

interface Istate {
  ingredients: Iingredient[];
  multiplier: Number;
}

// component to display the converted amount of ingredients
function ConvertedIngredients() {
  const location = useLocation();
  const { ingredients, multiplier } = location.state as Istate;

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Typography variant="h6">
          Converted Ingredients(Multiplier: {multiplier.toString()})
        </Typography>
        {ingredients.map((ingredient) => (
          <Typography variant="body1">
            {Number(multiplier) * Number(ingredient.amount)} {ingredient.unit}{" "}
            {ingredient.name}
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
  );
}

export default ConvertedIngredients;
