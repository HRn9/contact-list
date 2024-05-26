import { Grid, TextField, Button } from "@mui/material";
import { useRef, useState } from "react";
import * as Yup from "yup";
import { StringSchema } from "yup";

export default function ContactForm() {
  const nameRef = useRef(null);
  const vacancyRef = useRef(null);
  const phoneRef = useRef(null);

  const [nameError, setNameError] = useState("");
  const [vacancyError, setVacancyError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  function handleAdding() {
    const validationSchema = Yup.object().shape({
      name: Yup.string()
        .required("Field name is required")
        .min(3, "Name must be at least 3 characters long"),
      vacancy: Yup.string().required("Field vacancy is required"),
      phone: Yup.string()
        .required("Field phone is required")
        .matches(/^\d+$/, "Phone must contain only numbers"),
    });

    const nameValue = (nameRef.current as unknown as HTMLInputElement).value;

    (validationSchema.fields.name as StringSchema<string>)
      .validate(nameValue)
      .then(() => setNameError(""))
      .catch((error) => setNameError(error.message));

    const vacancyValue = (vacancyRef.current as unknown as HTMLInputElement)
      .value;

    (validationSchema.fields.vacancy as StringSchema<string>)
      .validate(vacancyValue)
      .then(() => setVacancyError(""))
      .catch((error) => setVacancyError(error.message));

    const phoneValue = (phoneRef.current as unknown as HTMLInputElement).value;

    (validationSchema.fields.phone as StringSchema<string>)
      .validate(phoneValue)
      .then(() => setPhoneError(""))
      .catch((error) => setPhoneError(error.message));
  }
  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={2}>
        <TextField
          error={!!nameError}
          size="small"
          id="outlined-basic"
          label="Name"
          helperText={nameError}
          variant="outlined"
          inputRef={nameRef}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          error={!!vacancyError}
          helperText={vacancyError}
          size="small"
          id="outlined-basic"
          label="Vacancy"
          variant="outlined"
          inputRef={vacancyRef}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          error={!!phoneError}
          helperText={phoneError}
          size="small"
          id="outlined-basic"
          label="Phone"
          variant="outlined"
          inputRef={phoneRef}
        />
      </Grid>
      <Grid item xs={0}>
        <Button variant="outlined" onClick={handleAdding}>
          ADD
        </Button>
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
