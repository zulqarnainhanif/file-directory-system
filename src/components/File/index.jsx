import React, { Fragment, useState } from "react";

import {
  Container,
  Dialog,
  DialogTitle,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import "./index.css";
import { getFileDirectory } from "../../api/fileDirectoryApi";
import { withSnackbar } from "notistack";

const File = (props) => {
  const { name, path } = props;
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(null);

  const handleClick = () => {
    getFileDirectory(path)
      .then((res) => {
        setDetails(res);
        setOpen(true);
      })
      .catch((error) => {
        props.enqueueSnackbar(
          error?.message || "Failed to fetch File contents!",
          { variant: "error" }
        );
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <ListItemButton className="File-button" onClick={handleClick}>
        <ListItemText primary={name} />
      </ListItemButton>
      <Dialog maxWidth="md" fullWidth onClose={handleClose} open={open}>
        <DialogTitle>Content of {name}</DialogTitle>
        <Container className="File-dialog-content">
          <Typography>{details?.contents}</Typography>
        </Container>
      </Dialog>
    </Fragment>
  );
};

export default withSnackbar(File);
