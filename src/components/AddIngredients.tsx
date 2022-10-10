import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import HelpCenterOutlinedIcon from "@mui/icons-material/HelpCenterOutlined";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useLocation } from "react-router-dom";
import uniqid from "uniqid";
import { Iingredient, Istate } from "../utils/interfaces";
import EditIngredientForm from "./EditIngredientForm";
import HelpDialog from "./HelpDialog";
import {
  isDecimalOrFraction,
  numericPlaceHolder,
  isIngredientEmpty,
  validateIngredient,
  createEmptyIngredient,
  getNonEmptyTrimmedIngredients,
} from "../utils/constantsAndFunctions";
// import { regE } from "../utils/testSet";

// Component for listing ingredients for a recipe
function AddIngredients() {
  const navigate = useNavigate();
  const location = useLocation();
  const previous = location.state as Istate;
  const [multiplier, setMultiplier] = useState(
    previous ? previous.multiplier : "",
  );
  const initialIngredientsArray = [];
  for (let i = 0; i < 7; i += 1) {
    initialIngredientsArray.push(createEmptyIngredient());
  }
  const [ingredients, setIngredients] = useState<Iingredient[]>(
    previous ? previous.ingredients : initialIngredientsArray,
  );
  const [multiplierError, setMultiplierError] = useState(false);
  const [multiplierErrorMsg, setMultiplierErrorMsg] = useState("");
  const [atLeastOneIngAlert, setAtLeastOneIngAlert] = useState(false);
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);
  function handleMultiplierChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMultiplier(e.target.value);
  }

  function editIngredient(editedIngredient: Iingredient): void {
    const newIngredientList = ingredients.map((ingredient) =>
      ingredient.id === editedIngredient.id ? editedIngredient : ingredient,
    );
    setIngredients(newIngredientList);
  }

  function onClickAddIngredient() {
    const newIngredient = {
      amount: "",
      unit: "",
      name: "",
      errorMessages: {
        name: "",
        amount: "",
      },
      id: uniqid(),
    };
    setIngredients([...ingredients, newIngredient]);
  }

  function onClickConvert() {
    // Checking for multiplier errors
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

    // Checking for Ingredients Error

    // Checking there is at least one ingredient
    const nonEmptyTrimmedIng = getNonEmptyTrimmedIngredients(ingredients);
    if (nonEmptyTrimmedIng.length <= 0) {
      setAtLeastOneIngAlert(true);
      return;
    }

    // Validating each ingredient field
    let isThereAnIngredientWithError = false;
    const ingredientsWithUpdatedErrors = ingredients.map((ingredient) => {
      // only validate non-empty ingredients
      if (!isIngredientEmpty(ingredient)) {
        const errorMessages = validateIngredient(ingredient);
        // Make a note if there is an ingredient with error
        // to prevent converting later
        if (
          !isThereAnIngredientWithError &&
          (errorMessages.amount !== "" || errorMessages.name !== "")
        ) {
          isThereAnIngredientWithError = true;
        }
        const ingredientWithNewErrors = {
          ...ingredient,
          errorMessages,
        };
        return ingredientWithNewErrors;
      }
      return ingredient;
    });
    // Updating error messages in each ingredients
    setIngredients(ingredientsWithUpdatedErrors);

    // Only allow convertion when there is no ingredient with error
    if (!isThereAnIngredientWithError) {
      navigate("/convert", {
        state: { ingredients: nonEmptyTrimmedIng, multiplier },
      });
    }
  }

  function onClickHelp() {
    setIsHelpDialogOpen(true);
  }

  function handleCloseHelpDialog() {
    setIsHelpDialogOpen(false);
  }

  function deleteIngredient(id: string) {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  }

  return (
    <div>
      <Container maxWidth="md">
        <HelpDialog
          handleCloseHelpDialog={handleCloseHelpDialog}
          isHelpDialogOpen={isHelpDialogOpen}
        />
        <Typography variant="h6">
          Add Ingredients
          <IconButton size="small" onClick={onClickHelp}>
            <HelpCenterOutlinedIcon />
          </IconButton>
        </Typography>
        {atLeastOneIngAlert && (
          <Alert severity="error">
            At least one ingredient is required before converting.
          </Alert>
        )}
        <Stack spacing={1}>
          <Grid container spacing={2} mb={1}>
            <Grid item xs={2.6}>
              <Typography variant="body1" ml={2}>
                Amount
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" ml={2}>
                unit
              </Typography>
            </Grid>
            <Grid item xs={3.4}>
              <Typography variant="body1" ml={2}>
                name
              </Typography>
            </Grid>
          </Grid>
          {ingredients.map((ingredient) => (
            <EditIngredientForm
              key={ingredient.id}
              ingredient={ingredient}
              deleteIngredient={deleteIngredient}
              editIngredient={editIngredient}
            />
          ))}
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={onClickAddIngredient}
          >
            Add Ingredients
          </Button>
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
