import { useSelector } from "react-redux";
import { RootState } from "../types";
import ListCard from "./ListCard";
import mapContacts from "../utils/mapContacts";
import List from "@mui/material/List";

export default function ContactList() {
  const contacts = useSelector((state: RootState) => state.contacts);
  const mappedContacts = mapContacts(contacts);
  return (
    <>
    <List sx={{ width: "70%", margin: "auto"}}>
      {Object.entries(mappedContacts).map((item) => {
        const [ letterTitle, contactList ] = item;
        return (
          <ListCard 
          key={letterTitle}
          cardTitle={letterTitle}
          cardChildren={contactList}
          />
        )
      })}
      </List>
    </>
  );
}
