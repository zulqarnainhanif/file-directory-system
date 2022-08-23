import React, { Fragment, useState } from "react";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";

import "./index.css";
import File from "../File";
import { getFileDirectory } from "../../api/fileDirectoryApi";
import { withSnackbar } from "notistack";

const Directory = (props) => {
  const { name, path } = props;
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(null);

  const handleClick = () => {
    getFileDirectory(path)
      .then((res) => {
        setDetails(res);
        setOpen(!open);
      })
      .catch((error) => {
        props.enqueueSnackbar(
          error?.message || "Failed to fetch Directory details!",
          { variant: "error" }
        );
      });
  };

  const haveDetails = details?.entries?.length > 0;

  return (
    <Fragment>
      <ListItemButton className="Directory-button" onClick={handleClick}>
        {open && <ExpandLess />}
        {!open && <ExpandMore />}
        <ListItemText primary={name} />
      </ListItemButton>
      {haveDetails && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" className="Directory-details">
            {details?.entries?.map((dir, index) =>
              dir.type === "directory" ? (
                <Directory
                  key={index}
                  name={dir.name}
                  enqueueSnackbar={props.enqueueSnackbar}
                  path={path === "root" ? dir.name : path + "/" + dir.name}
                />
              ) : (
                <File
                  key={index}
                  name={dir.name}
                  enqueueSnackbar={props.enqueueSnackbar}
                  path={path === "root" ? dir.name : path + "/" + dir.name}
                />
              )
            )}
          </List>
        </Collapse>
      )}
    </Fragment>
  );
};

export default withSnackbar(Directory);
