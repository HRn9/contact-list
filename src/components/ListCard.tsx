import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { Contact } from "../types";

interface ListCardProps {
  cardTitle: string;
  cardChildren: Contact[];
}

export default function ListCard({ cardTitle, cardChildren }: ListCardProps) {
  const [open, setOpen] = useState(false);

const handleClick = () => {
  setOpen((prevState) => !prevState);
};

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={`${cardTitle} (${cardChildren.length})`} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* {contactCardComponent} */}
        </List>
      </Collapse>
    </>
  );
}
