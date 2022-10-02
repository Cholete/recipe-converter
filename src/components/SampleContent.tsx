import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

interface ISampleContentProps {
  amount: string;
  unit?: string;
  name: string;
}

function SampleContent(props: ISampleContentProps) {
  const { amount, unit, name } = props;

  return (
    <Grid container columnSpacing={1} mt={1.5}>
      <Grid item xs={2.6}>
        <TextField
          required
          InputLabelProps={{ shrink: true }}
          name="amount"
          label="Amount"
          variant="outlined"
          value={amount}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          InputLabelProps={{ shrink: true }}
          name="unit"
          label="Unit"
          variant="outlined"
          value={unit}
        />
      </Grid>
      <Grid item xs={3.4}>
        <TextField
          required
          InputLabelProps={{ shrink: true }}
          name="name"
          label="Name"
          variant="outlined"
          value={name}
        />
      </Grid>
    </Grid>
  );
}

SampleContent.defaultProps = {
  unit: "",
};

export default SampleContent;
