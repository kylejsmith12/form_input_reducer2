// src/components/RowDisplay.jsx
import React from "react";
import { Grid2, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

const RowDisplay = ({ rows, editingRow, startEditing, saveEdit, dispatch }) => {
  return (
    <>
      {rows.map((row, index) => (
        <Grid2 container spacing={2} key={index} sx={{ marginBottom: 2 }}>
          {Object.values(row).map((value, idx) => (
            <Grid2
              item
              xs={idx === 0 || idx === 6 || idx === 7 ? 1 : 2}
              key={idx}
            >
              {value}
            </Grid2>
          ))}
          <Grid2 item xs={1}>
            {editingRow === index ? (
              <IconButton onClick={saveEdit}>
                <CheckIcon />
              </IconButton>
            ) : (
              <>
                <IconButton onClick={() => startEditing(index)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => dispatch({ type: "DELETE_ROW", index })}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </Grid2>
        </Grid2>
      ))}
    </>
  );
};

export default RowDisplay;
