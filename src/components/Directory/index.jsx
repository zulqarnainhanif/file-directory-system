import React, { Fragment, useState } from "react";

import { withSnackbar } from "notistack";

import "./index.css";
import File from "../File";
import { getFileDirectory } from "../../api/fileDirectoryApi";
import { ReactComponent as ExpandMore } from "../../assets/icons/ExpandMore.svg";
import { ReactComponent as ExpandLess } from "../../assets/icons/ExpandLess.svg";

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
      <div className="Directory-button" onClick={handleClick}>
        {open && <ExpandLess />}
        {!open && <ExpandMore />}
        <div>{name}</div>
      </div>
      {haveDetails && open && (
        <div className="Directory-details">
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
        </div>
      )}
    </Fragment>
  );
};

export default withSnackbar(Directory);
