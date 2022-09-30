import React from "react";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

interface IHelpDialogProps {
  handleCloseHelpDialog(): void;
  isHelpDialogOpen: boolean;
}

function HelpDialog(props: IHelpDialogProps) {
  const { handleCloseHelpDialog, isHelpDialogOpen } = props;
  return (
    <Dialog onClose={handleCloseHelpDialog} open={isHelpDialogOpen}>
      <DialogTitle>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          How To use Recipe Converter
          <IconButton aria-label="close" onClick={handleCloseHelpDialog}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="h6">Amount</Typography>
        <Typography variant="body1">
          How much of the ingredient do you need for the recipe.
        </Typography>
        <Typography variant="body1">
          Accepted inputs are integer, decimals and fractions.
        </Typography>
        <Typography variant="body1">e.g. 2, 1.5, 3/4, 3 1/2</Typography>
        <Typography variant="h6" mt={1.5}>
          Unit
        </Typography>
        <Typography variant="body1">
          Unit of the measurement of the ingredient.
        </Typography>
        <Typography variant="h6" mt={1.5}>
          Name
        </Typography>
        <Typography variant="body1">Name of the ingredient.</Typography>
        <Typography variant="h6" mt={1.5}>
          Example
        </Typography>
        <Typography variant="body1">
          If your recipe calls for 2 1/2 cups of sugar, this is how you should
          enter it:
        </Typography>
        <Grid container columnSpacing={1} mt={1.5}>
          <Grid item xs={2.6}>
            <TextField
              required
              InputLabelProps={{ shrink: true }}
              name="amount"
              label="Amount"
              variant="outlined"
              value="2 1/2"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              InputLabelProps={{ shrink: true }}
              name="unit"
              label="Unit"
              variant="outlined"
              value="cups"
            />
          </Grid>
          <Grid item xs={3.4}>
            <TextField
              required
              InputLabelProps={{ shrink: true }}
              name="name"
              label="Name"
              variant="outlined"
              value="sugar"
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
export default HelpDialog;
