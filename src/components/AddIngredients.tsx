import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { useNavigate, useLocation } from "react-router-dom";
import uniqid from "uniqid";
import { Iingredient, Istate } from "../utils/interfaces";
import SingleIngredient from "./SingleIngredient";
import EditIngredientForm from "./EditIngredientForm";
import {
  isDecimalOrFraction,
  numericPlaceHolder,
} from "../utils/constantsAndFunctions";

// Component for listing ingredients for a recipe
function AddIngredients() {
  const navigate = useNavigate();
  const location = useLocation();
  const previous = location.state as Istate;
  const [multiplier, setMultiplier] = useState(
    previous ? previous.multiplier : "",
  );
  const [ingredients, setIngredients] = useState<Iingredient[]>(
    previous ? previous.ingredients : [],
  );
  const [multiplierError, setMultiplierError] = useState(false);
  const [multiplierErrorMsg, setMultiplierErrorMsg] = useState("");
  const [atLeastOneIngAlert, setAtLeastOneIngAlert] = useState(false);

  function handleMultiplierChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMultiplier(e.target.value);
  }

  function saveIngredient(ingredient: Iingredient): void {
    setIngredients([
      ...ingredients,
      {
        amount: ingredient.amount,
        unit: ingredient.unit,
        name: ingredient.name,
        id: uniqid(),
      },
    ]);

    // remove alert requiring one ingredient
    setAtLeastOneIngAlert(false);
  }

  function onClickConvert() {
    if (multiplier.length === 0) {
      setMultiplierErrorMsg("Multiplier is Required.");
      setMultiplierError(true);
      return;
    }
    if (!isDecimalOrFraction(multiplier)) {
      setMultiplierErrorMsg("Invalid Multiplier.");
      setMultiplierError(true);
      return;
    }
    if (ingredients.length <= 0) {
      setAtLeastOneIngAlert(true);
      // require name and amount for one ingredient
      // setNewIngError({
      //   name: true,
      //   amount: true,
      // });
      return;
    }
    navigate("/convert", { state: { ingredients, multiplier } });
  }

  function deleteIngredient(id: string) {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  }

  return (
    <div>
      <Container maxWidth="md">
        <Typography variant="h6">Add Ingredients</Typography>
        {atLeastOneIngAlert && (
          <Alert severity="error">
            At least one ingredient is required before converting.
          </Alert>
        )}
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
          <EditIngredientForm saveIngredient={saveIngredient} />
        </Stack>
        <Stack spacing={2} direction="row" mt={4} mb={20}>
          <TextField
            required
            InputLabelProps={{ shrink: true }}
            name="multiplier"
            label="Multiplier"
            placeholder={numericPlaceHolder}
            variant="outlined"
            value={multiplier}
            onChange={handleMultiplierChange}
            error={multiplierError}
            helperText={multiplierErrorMsg}
          />
          <Button
            variant="contained"
            onClick={onClickConvert}
            sx={{
              height: "40px",
            }}
          >
            Convert Ingredients
          </Button>
        </Stack>
      </Container>
    </div>
  );
}

export default AddIngredients;
