import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
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
  );
}

export default ConvertedIngredients;
