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
import {
  isDecimalOrFraction,
  numericPlaceHolder,
} from "../utils/constantsAndFunctions";

const math = create(all, { number: "number" });

// format numbers either as fraction(regular or mixed), decimal, or integer
function formatAmount(
  amount: number | math.Fraction,
  formatType: "fraction" | "decimal",
): string {
  const amountAsNumber = math.number(amount);
  if (formatType === "fraction") {
    // separating the whole part and fractional part of a number
    const wholePart = math.floor(amountAsNumber);
    const fractionalPart = math.subtract(amountAsNumber, wholePart);

    // formatting output
    if (wholePart !== 0 && fractionalPart !== 0) {
      // mixed fraction
      return `${wholePart} ${math.format(math.fraction(fractionalPart), {
        fraction: "fraction",
      })}`;
    }
    if (fractionalPart !== 0) {
      return `${math.format(math.fraction(fractionalPart), {
        // fraction
        fraction: "fraction",
      })}`;
    }
  }
  // integer or decimal
  return math.format(amountAsNumber, {
    precision: 4,
  });
}

// scale the amount by the multiplier
function scaleAmount(
  amount: string,
  multiplier: string,
  formatType: "fraction" | "decimal",
): string {
  // Amount and multiplier turned to fraction in case user inputted them as fraction.
  const product = math.multiply(
    math.fraction(amount),
    math.fraction(multiplier),
  ) as math.Fraction;
  return formatAmount(product, formatType);
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

  // toggle fraction display
  const [displayInFraction, setDisplayInFraction] = useState(false);

  function handleMultiplierChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewMultiplier(e.target.value);
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
    if (!isDecimalOrFraction(newMultiplier)) {
      setNewMultiplierErrorMsg("Invalid Multiplier.");
      setNewMultiplierError(true);
      return;
    }
    // setting new multiplier if everything is valid
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
            <Typography variant="body1" key={ingredient.id}>
              {/* multiply amount and multipier then format in either fraction or decimal */}
              {scaleAmount(
                ingredient.amount,
                currentMultiplier,
                displayInFraction ? "fraction" : "decimal",
              )}{" "}
              {ingredient.unit} {ingredient.name}
            </Typography>
          ))}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Original Ingredients</Typography>
          {ingredients.map((ingredient) => (
            <Typography variant="body1" key={ingredient.id}>
              {formatAmount(
                // converting to fraction in case amount is entered as fraction
                math.fraction(ingredient.amount),
                displayInFraction ? "fraction" : "decimal",
              )}{" "}
              {ingredient.unit} {ingredient.name}
            </Typography>
          ))}
        </Grid>
      </Grid>
      <Stack sx={{ mt: 5 }} direction="row" spacing={2}>
        <TextField
          required
          InputLabelProps={{ shrink: true }}
          name="multiplier"
          label="Multiplier"
          placeholder={numericPlaceHolder}
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
