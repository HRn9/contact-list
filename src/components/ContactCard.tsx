import Card from "@mui/material/Card/Card";
import { CardContent, Typography } from "@mui/material";
import { Contact } from "../types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import contactsStore from "../store/contacts-state";

export default function ContactCard(contactData: Contact) {
  function handleDeletion() {
    contactsStore.dispatch({ type: "DELETE_CONTACT", payload: contactData.id });
  }
  return (
    <Card variant="outlined">
      <CardContent style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
          }}
        >
          <EditIcon style={{ cursor: "pointer" }} />
          <DeleteIcon style={{ cursor: "pointer" }} onClick={handleDeletion} />
        </div>
        <Typography variant="h5" component="div">
          {contactData.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {contactData.vacancy}
        </Typography>
        <Typography variant="body2">{contactData.phone}</Typography>
      </CardContent>
    </Card>
  );
}
