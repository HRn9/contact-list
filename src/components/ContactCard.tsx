import Card from "@mui/material/Card/Card";
import { CardContent, Typography } from "@mui/material";
import { Contact } from "../types";

export default function ContactCard(contactData: Contact) {
  const card = (
    <>
      <CardContent>
        <Typography variant="h5" component="div">
          {contactData.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {contactData.vacancy}
        </Typography>
        <Typography variant="body2">{contactData.phone}</Typography>
      </CardContent>
    </>
  );
  return <Card variant="outlined">{card}</Card>;
}
