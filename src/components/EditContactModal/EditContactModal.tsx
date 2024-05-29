import { Button, TextField } from "@mui/material";
import { Contact } from "../../types";
import { createPortal } from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { validateFields } from "../../validationFields/validateFields";
import { validationSchema } from "../../validationFields/schemes/contactFormSchema";
import classes from "./EditContactModal.module.scss";
import contactsStore from "../../store/contacts-state";

export default function EditContactModal({
  contact,
  isOpen,
  setIsOpen,
}: {
  contact: Contact;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  console.log(contact)
  type Errors = Partial<Record<"name" | "vacancy" | "phone", string>>;
  const [errors, setErrors] = useState<Errors>({});

  const [name, setName] = useState(contact.name);
  const [vacancy, setVacancy] = useState(contact.vacancy);
  const [phone, setPhone] = useState(contact.phone);

  const onWrapperClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = event.target as HTMLElement;
    target.classList.contains("modal-wrapper") && setIsOpen(false);
  };

  const onSaveClick = async () => {
    const errors = (await validateFields(
      { name, vacancy, phone },
      validationSchema
    )) as Errors;

    setErrors(errors || {});

    if (!errors) {
      const updatedContact: Contact = {
        name,
        vacancy,
        phone,
        id: contact.id,
      };

      if (JSON.stringify(updatedContact) !== JSON.stringify(contact)) {
        contactsStore.dispatch({
          type: "UPDATE_CONTACT",
          payload: updatedContact,
        });
      }
      setIsOpen(false);
    }
  };

  return (
    isOpen &&
    createPortal(
      <div className={classes.modal}>
        <div className={classes.modalWrapper} onClick={onWrapperClick}>
          <div className={classes.modalContent}>
            <CloseIcon
              className="close-icon"
              onClick={() => setIsOpen(false)}
            />
            <TextField
              size="small"
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              size="small"
              id="outlined-basic"
              label="Vacancy"
              variant="outlined"
              value={vacancy}
              onChange={(e) => setVacancy(e.target.value)}
              error={!!errors.vacancy}
              helperText={errors.vacancy}
            />
            <TextField
              size="small"
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <Button
              variant="outlined"
              style={{ margin: "0 auto" }}
              onClick={onSaveClick}
            >
              SAVE
            </Button>
          </div>
        </div>
      </div>,
      document.body
    )
  );
}
