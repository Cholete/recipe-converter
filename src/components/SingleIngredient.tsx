import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Iingredient } from "../utils/interfaces";

interface SingleIngredientProps {
  ingredient: Iingredient;
  deleteIngredient: (id: string) => void;
}

// component for a single ingredient in the ingredient list
function SingleIngredient({
  ingredient,
  deleteIngredient,
}: SingleIngredientProps) {
  function onClickDelete() {
    deleteIngredient(ingredient.id);
  }

  return (
    <Paper elevation={1}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Container>
            <Typography variant="body1">{ingredient.amount}</Typography>
          </Container>
        </Grid>
        <Grid item xs={2}>
          <Container>
            <Typography variant="body1">{ingredient.unit}</Typography>
          </Container>
        </Grid>
        <Grid item xs={6}>
          <Container>
            <Typography variant="body1">{ingredient.name}</Typography>
          </Container>
        </Grid>
        <Grid item xs={2}>
          <Button variant="text" size="small" onClick={onClickDelete}>
            DELETE
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default SingleIngredient;
