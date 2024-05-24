import { Grid, TextField, Button } from "@mui/material";

export default function ContactForm() {
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={2}>
        <TextField
          size="small"
          id="outlined-basic"
          label="Name"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          size="small"
          id="outlined-basic"
          label="Vacancy"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          size="small"
          id="outlined-basic"
          label="Phone"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={0}>
        <Button variant="outlined">ADD</Button>
      </Grid>
      <Grid item xs={0}>
        <Button variant="outlined">CLEAR LIST</Button>
      </Grid>
      <Grid item xs={0}>
        <Button variant="outlined">SEARCH</Button>
      </Grid>
    </Grid>
  );
}
