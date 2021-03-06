import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import uniqid from "uniqid";
import { Iingredient } from "../utils/interfaces";
import SingleIngredient from "./SingleIngredient";
import { decimalInputRegex, decimalValidationRegex } from "../utils/regex";

// Component for listing ingredients for a recipe
function AddIngredients() {
  const navigate = useNavigate();
  const [newIngredient, setNewIngredient] = useState<Iingredient>({
    amount: "",
    unit: "",
    name: "",
    id: "",
  });
  const [multiplier, setMultiplier] = useState("1");
  const [ingredients, setIngredients] = useState<Iingredient[]>([]);
  const [multiplierError, setMultiplierError] = useState(false);
  const [multiplierErrorMsg, setMultiplierErrorMsg] = useState("");
  const [newIngError, setNewIngError] = useState({
    name: false,
    amount: false,
  });
  const [newIngErrorMsg, setNewIngErrorMsg] = useState({
    name: "",
    amount: "",
  });
  const [atLeastOneIngAlert, setAtLeastOneIngAlert] = useState(false);

  function validate() {
    const errorMessages = {
      name: "",
      amount: "",
    };

    if (!newIngredient.name.trim()) {
      // empty name
      errorMessages.name = "Name is required.";
    }

    const amount = newIngredient.amount.trim();
    if (!amount) {
      // empty amount
      errorMessages.amount = "Amount is required.";
    } else if (!decimalValidationRegex.test(amount)) {
      // not a decimal
      errorMessages.amount = "Invalid Amount.";
    }

    return errorMessages;
  }

  function handleNewIngredientChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === "amount") {
      const amount = e.target.value.trim();
      // only allow decimal inputs or empty string
      if (amount.length !== 0 && !decimalInputRegex.test(amount)) {
        return;
      }
    }

    setNewIngredient({
      ...newIngredient,
      [e.target.name]: e.target.value,
    });
  }

  function handleMultiplierChange(e: React.ChangeEvent<HTMLInputElement>) {
    // allow empty string or decimal inputs
    if (e.target.value.length === 0 || decimalInputRegex.test(e.target.value)) {
      setMultiplier(e.target.value);
    }
  }

  function onClickAdd() {
    const errorMessages = validate();
    const newError = {
      name: errorMessages.name.length !== 0,
      amount: errorMessages.amount.length !== 0,
    };

    setNewIngError(newError);
    // no errors
    if (!Object.values(newError).includes(true)) {
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
      // removing error messages
      setNewIngError({
        amount: false,
        name: false,
      });
      // remove alert requiring one ingredient
      setAtLeastOneIngAlert(false);
    } else {
      setNewIngErrorMsg(errorMessages);
    }
  }

  function onClickConvert() {
    if (multiplier.length === 0) {
      setMultiplierErrorMsg("Multiplier is Required.");
      setMultiplierError(true);
      return;
    }
    if (!decimalValidationRegex.test(multiplier)) {
      setMultiplierErrorMsg("Invalid Multiplier.");
      setMultiplierError(true);
      return;
    }
    if (ingredients.length <= 0) {
      setAtLeastOneIngAlert(true);
      setNewIngError({
        name: true,
        amount: true,
      });
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
                onChange={handleNewIngredientChange}
                error={newIngError.amount}
                helperText={newIngErrorMsg.amount}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
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
                error={newIngError.name}
                helperText={newIngErrorMsg.name}
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
            value={multiplier}
            onChange={handleMultiplierChange}
            error={multiplierError}
            helperText={multiplierErrorMsg}
          />
          <Button variant="contained" onClick={onClickConvert}>
            Convert Ingredients
          </Button>
        </Stack>
      </Container>
    </div>
  );
}

export default AddIngredients;
