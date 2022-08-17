import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useLocation, Link } from "react-router-dom";
import { create, all } from "mathjs";
import { Iingredient } from "../utils/interfaces";
import { decimalInputRegex, decimalValidationRegex } from "../utils/regex";

const config = {};
const math = create(all, config);

// format numbers either as fraction or decimal
function formatAmount(value: any, formatType: "fraction" | "decimal") {
  return math.format(value, { fraction: formatType });
}

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
  const [newMultiplierError, setNewMultiplierError] = useState(false);
  const [newMultiplierErrorMsg, setNewMultiplierErrorMsg] = useState("");
  const [displayInFraction, setDisplayInFraction] = useState(false);

  function handleMultiplierChange(e: React.ChangeEvent<HTMLInputElement>) {
    // allow empty string or decimal inputs
    if (e.target.value.length === 0 || decimalInputRegex.test(e.target.value)) {
      setNewMultiplier(e.target.value);
    }
  }

  function onFractionSwitchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDisplayInFraction(event.target.checked);
  }

  function onClickChangeMultiplier() {
    if (newMultiplier.length === 0) {
      setNewMultiplierErrorMsg("Multiplier is Required.");
      setNewMultiplierError(true);
      return;
    }
    if (!decimalValidationRegex.test(newMultiplier)) {
      setNewMultiplierErrorMsg("Invalid Multiplier.");
      setNewMultiplierError(true);
      return;
    }
    setCurrentMultiplier(newMultiplier);
    setNewMultiplierError(false);
    setNewMultiplierErrorMsg("");
  }

  return (
    <Container>
      <FormGroup>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={displayInFraction}
                onChange={onFractionSwitchChange}
              />
            }
            label="show amount in fraction"
          />
        </FormGroup>
      </FormGroup>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h6">
            Converted Ingredients(Multiplier: {currentMultiplier})
          </Typography>
          {ingredients.map((ingredient) => (
            <Typography variant="body1">
              {/* multiply amount and multipier then format in either fraction or decimal */}
              {formatAmount(
                math.multiply(
                  math.fraction(ingredient.amount),
                  math.fraction(currentMultiplier),
                ),
                displayInFraction ? "fraction" : "decimal",
              )}{" "}
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
          value={newMultiplier}
          onChange={handleMultiplierChange}
          error={newMultiplierError}
          helperText={newMultiplierErrorMsg}
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
