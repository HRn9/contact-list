import { Grid, TextField, Button } from "@mui/material";
import { useState } from "react";
import { Contact } from "../types";
import { v4 as uuidv4 } from "uuid";
import contactsStore from "../store/contacts-state";
import { validateFields } from "../validationFields/validateFields";
import { validationSchema } from "../validationFields/schemes/contactFormSchema";

export default function ContactForm() {
  type Errors = Partial<Record<"name" | "vacancy" | "phone", string>>;

  const [errors, setErrors] = useState<Errors>({});

  const [name, setName] = useState("");
  const [vacancy, setVacancy] = useState("");
  const [phone, setPhone] = useState("");

  async function handleAdding() {
    const errors = (await validateFields(
      { name, vacancy, phone },
      validationSchema
    )) as Errors;

    setErrors(errors || {});

    if (!errors) {
      const newContact: Contact = {
        name,
        vacancy,
        phone,
        id: uuidv4(),
      };

      contactsStore.dispatch({ type: "ADD_CONTACT", payload: newContact });
      setName("");
      setVacancy("");
      setPhone("");
    }
  }

  function handleClearing() {
    contactsStore.dispatch({ type: "CLEAR_STORE" });
  }

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      marginBottom={Object.keys(errors).length ? "2.5rem" : "0px"}
    >
      <Grid item xs={2}>
        <TextField
          error={!!errors.name}
          size="small"
          id="outlined-basic"
          label="Name"
          helperText={<span className="main-formHelperText">{errors.name}</span>}
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          error={!!errors.vacancy}
          helperText={<span className="main-formHelperText">{errors.vacancy}</span>}
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
          helperText={<span className="main-formHelperText">{errors.phone}</span>}
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
        <Button variant="outlined" onClick={handleClearing}>
          CLEAR LIST
        </Button>
      </Grid>
      <Grid item xs={0}>
        <Button variant="outlined">SEARCH</Button>
      </Grid>
    </Grid>
  );
}
