import React, { useReducer, useState } from "react";
import { Grid, Select, MenuItem, TextField, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import RowDisplay from "./RowDisplay";

const initialState = {
  rows: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_ROW":
      return { ...state, rows: [...state.rows, action.payload] };
    case "EDIT_ROW":
      return {
        ...state,
        rows: state.rows.map((row, index) =>
          index === action.index ? { ...row, ...action.payload } : row
        ),
      };
    case "DELETE_ROW":
      return {
        ...state,
        rows: state.rows.filter((_, index) => index !== action.index),
      };
    default:
      return state;
  }
}

const FormGrid = ({ fieldConfig }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [formData, setFormData] = useState(() => {
    // Initialize form data dynamically based on the fieldConfig keys
    return fieldConfig.reduce(
      (acc, field) => ({ ...acc, [field.name]: field.initialValue || "" }),
      {}
    );
  });
  const [editingRow, setEditingRow] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addRow = () => {
    if (editingRow !== null) {
      dispatch({ type: "EDIT_ROW", index: editingRow, payload: formData });
      setEditingRow(null); // Exit editing mode
    } else {
      dispatch({ type: "ADD_ROW", payload: formData });
    }
    setFormData(
      fieldConfig.reduce(
        (acc, field) => ({ ...acc, [field.name]: field.initialValue || "" }),
        {}
      )
    ); // Reset form
  };

  const startEditing = (index) => {
    setEditingRow(index);
    setFormData(state.rows[index]);
  };

  const handleMultiSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Calculate how many columns each field should take based on the number of fields
  const colSize = Math.floor(12 / fieldConfig.length);

  return (
    <>
      <RowDisplay
        rows={state.rows}
        editingRow={editingRow}
        startEditing={startEditing}
        saveEdit={addRow}
        dispatch={dispatch}
      />

      {/* Grid Form */}
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        {fieldConfig.map((field, index) => (
          <Grid item xs={colSize} key={index}>
            {field.type === "select" ? (
              <Select
                fullWidth
                value={formData[field.name]}
                name={field.name}
                onChange={handleInputChange}
              >
                {field.options.map((option, idx) => (
                  <MenuItem key={idx} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            ) : field.type === "multiSelect" ? (
              <Select
                multiple
                fullWidth
                value={formData[field.name]}
                name={field.name}
                onChange={handleMultiSelectChange}
                renderValue={(selected) => selected.join(", ")}
              >
                {field.options.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <TextField
                fullWidth
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                placeholder={field.placeholder || ""}
              />
            )}
          </Grid>
        ))}
        <Grid item xs={1}>
          <IconButton onClick={addRow}>
            {editingRow !== null ? <CheckIcon /> : <AddIcon />}
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default FormGrid;
