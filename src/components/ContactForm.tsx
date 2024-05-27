import { Grid, TextField, Button } from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import { Contact } from "../types";
import { v4 as uuidv4 } from 'uuid';
import contactsStore from "../store/contacts-state";

export default function ContactForm() {
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Field name is required")
      .min(3, "Name must be at least 3 characters long"),
    vacancy: Yup.string().required("Field vacancy is required"),
    phone: Yup.string()
      .required("Field phone is required")
      .matches(/^\d+$/, "Phone must contain only numbers"),
  });

  type Errors = Partial<Record<"name" | "vacancy" | "phone", string>>;

  const [errors, setErrors] = useState<Errors>({});

  const [name, setName] = useState("");
  const [vacancy, setVacancy] = useState("");
  const [phone, setPhone] = useState("");

  const handleError = (error: Yup.ValidationError) => {
    const errors = error.inner.reduce((acc, error) => {
      const { path, message } = error;
      if (path) {
        acc[path as keyof Errors] = message;
      }
      return acc;
    }, {} as Errors);
    setErrors(errors);
  };

  async function handleAdding() {
    try {
      setErrors({});

      await validationSchema.validate(
        { name, vacancy, phone },
        { abortEarly: false }
      );

      const newContact: Contact = {
        name, vacancy, phone,
        id: uuidv4(),
      }

      contactsStore.dispatch({type: 'ADD_CONTACT', payload: newContact})
      setName('')
      setVacancy('')
      setPhone('')
    } catch (err) {
      handleError(err as unknown as Yup.ValidationError);
    }
  }

  function handleClearing() {
    contactsStore.dispatch({type: 'CLEAR_STORE'})
  }

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      marginBottom={Object.keys(errors).length ? '2.5rem' : "0px"}
    >
      <Grid item xs={2}>
        <TextField
          error={!!errors.name}
          size="small"
          id="outlined-basic"
          label="Name"
          helperText={errors.name}
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          error={!!errors.vacancy}
          helperText={errors.vacancy}
          size="small"
          id="outlined-basic"
          label="Vacancy"
          variant="outlined"
          value={vacancy}
          onChange={(e) => setVacancy(e.target.value)}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          error={!!errors.phone}
          helperText={errors.phone}
          size="small"
          id="outlined-basic"
          label="Phone"
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </Grid>
      <Grid item xs={0}>
        <Button variant="outlined" onClick={handleAdding}>
          ADD
        </Button>
      </Grid>
      <Grid item xs={0}>
        <Button variant="outlined" onClick={handleClearing}>CLEAR LIST</Button>
      </Grid>
      <Grid item xs={0}>
        <Button variant="outlined">SEARCH</Button>
      </Grid>
    </Grid>
  );
}
