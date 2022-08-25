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
  const [search, setSearch] = useState("");
  const [details, setDetails] = useState(null);

  const handleClick = () => {
    if (!open && !details) {
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
    } else {
      setOpen(!open);
    }
  };

  const handleSearchTextChange = (e) => {
    e.stopPropagation();
    setSearch(e.target.value);
  };

  const haveDetails = details?.entries?.length > 0;

  const filteredEnteries =
    search !== ""
      ? haveDetails &&
        details?.entries.filter((dir) =>
          dir.name.includes(search.trim().toLowerCase())
        )
      : details?.entries;

  return (
    <Fragment>
      <div className="Directory-button" onClick={handleClick}>
        {open && <ExpandLess />}
        {!open && <ExpandMore />}
        <div>{name}</div>
        {open && haveDetails && (
          <div
            className="Directory-searchbar"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <input
              value={search}
              placeholder="Enter search text here..."
              onChange={handleSearchTextChange}
            />
          </div>
        )}
      </div>
      {haveDetails && open && (
        <>
          {filteredEnteries.length ? (
            <div className="Directory-details">
              {filteredEnteries.map((dir, index) =>
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
          ) : (
            <div className="Directory-details">No record found</div>
          )}
        </>
      )}
    </Fragment>
  );
};

export default withSnackbar(Directory);
