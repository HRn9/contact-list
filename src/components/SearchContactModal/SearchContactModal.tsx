import { Modal, Backdrop, Fade, Box, TextField, List } from "@mui/material";
import { useState } from "react";
import { createPortal } from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { Contact, RootState } from "../../types";
import ContactCard from "../ContactCard";

const listCardStyles = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '0.3rem',
  maxHeight: '60vh'
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid gray",
  boxShadow: 24,
  p: 4,
  borderRadius: "1rem",
};

export default function SearchContactModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const contacts = useSelector((state: RootState) => state.contacts);

  const filterContacts = (contacts: Contact[], searchTerm: string) => {
    return contacts.filter((contact) =>
      Object.values(contact).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleClose = () => setIsOpen(false);
  return (
    isOpen &&
    createPortal(
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        style={{zIndex: '10'}}
      >
        <Fade in={isOpen}>
          <Box sx={style}>
            <CloseIcon
              className="close-icon"
              onClick={() => setIsOpen(false)}
            />
            <TextField
              id="standard-basic"
              label="SEARCH"
              variant="standard"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{marginBottom: '1rem'}}
            />

            <List component="div" disablePadding style={{...listCardStyles, overflowY: 'scroll'}}>
              {searchTerm &&
                filterContacts(contacts, searchTerm).map((item) => (
                  <ContactCard key={item.id} {...item} />
                ))}
            </List>
          </Box>
        </Fade>
      </Modal>,
      document.body
    )
  );
}
