import React from "react";
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SampleContent from "./SampleContent";

interface IHelpDialogProps {
  handleCloseHelpDialog(): void;
  isHelpDialogOpen: boolean;
}

function HelpDialog(props: IHelpDialogProps) {
  const { handleCloseHelpDialog, isHelpDialogOpen } = props;

  const sampleIngredients = [
    {
      amount: "2.5",
      unit: "cups",
      name: "flour",
    },
    {
      amount: "1 1/2",
      unit: "cups",
      name: "sugar",
    },
    {
      amount: "1/2",
      unit: "tsp",
      name: "baking powder",
    },
    {
      amount: "2",
      unit: "",
      name: "eggs",
    },
  ];

  return (
    <Dialog onClose={handleCloseHelpDialog} open={isHelpDialogOpen}>
      <DialogTitle sx={{ paddingBottom: 0 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5" component="h1">
            How To Use Recipe Converter
          </Typography>
          <IconButton aria-label="close" onClick={handleCloseHelpDialog}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <dl>
          <dt>
            <Typography variant="h6" component="h2">
              Amount
            </Typography>
          </dt>
          <dd>
            <Typography variant="body1">
              How much of the ingredient do you need for the recipe.
            </Typography>
          </dd>
          <dd>
            <Typography variant="body1">
              Accepted inputs are integer, decimals and fractions.
            </Typography>
          </dd>
          <dt>
            <Typography variant="h6" component="h2">
              Unit
            </Typography>
          </dt>
          <dd>
            <Typography variant="body1">
              Unit of the measurement of the ingredient.
            </Typography>
          </dd>
          <dt>
            <Typography variant="h6" component="h2">
              Name
            </Typography>
          </dt>
          <dd>
            <Typography variant="body1">Name of the ingredient.</Typography>
          </dd>
          <dt>
            <Typography variant="h6" component="h2">
              Multiplier
            </Typography>
          </dt>
          <dd>
            <Typography variant="body1">
              How much you want to scale the recipe.
            </Typography>
          </dd>
          <dd>
            <Typography variant="body1">
              Accepted inputs are integer, decimals and fractions.
            </Typography>
          </dd>
          <dd>
            <Typography variant="body1">For example:</Typography>
            <ul style={{ marginTop: 0 }}>
              <li>
                <Typography variant="body1">
                  To triple a recipe, use a multiplier of 3.
                </Typography>
              </li>
              <li>
                <Typography variant="body1">
                  To halve a recipe, use a multiplier of 0.5 or 1/2.
                </Typography>
              </li>
            </ul>
          </dd>
          <dt>
            <Typography variant="h6" component="h2">
              Example
            </Typography>
          </dt>
          <dd>
            <Typography variant="body1">
              Here is a sample entry of a recipe:
            </Typography>
            {sampleIngredients.map((sampleIngredient) => (
              <SampleContent
                key={sampleIngredient.name}
                amount={sampleIngredient.amount}
                unit={sampleIngredient.unit}
                name={sampleIngredient.name}
              />
            ))}
          </dd>
          <br />
          <dd>
            <Typography variant="body1">
              To scale this recipe to a quarter, the multiplier field should
              have 1/4:
            </Typography>
            <Stack spacing={2} direction="row" mt={1.5}>
              <TextField
                required
                InputLabelProps={{ shrink: true }}
                name="multiplier"
                label="Multiplier"
                variant="outlined"
                value="1/4"
              />
              <Button
                variant="contained"
                sx={{
                  height: "40px",
                }}
              >
                Convert Ingredients
              </Button>
            </Stack>
          </dd>
        </dl>
      </DialogContent>
    </Dialog>
  );
}
export default HelpDialog;
