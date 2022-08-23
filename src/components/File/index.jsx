import React, { Fragment, useState } from "react";

import { withSnackbar } from "notistack";

import "./index.css";
import { getFileDirectory } from "../../api/fileDirectoryApi";
import Dialog from "../Dialog";

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
      <div className="File-button" onClick={handleClick}>
        <div>{name}</div>
      </div>
      {open && details && (
        <Dialog
          handleClose={handleClose}
          title={`Content of ${name}`}
          contents={details?.contents}
        />
      )}
    </Fragment>
  );
};

export default withSnackbar(File);
