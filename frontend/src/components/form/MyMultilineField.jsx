// import React from "react";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

export default function MyMultilineField({
  label,
  placeholder,
  name,
  control,
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          multiline
          placeholder={placeholder}
          rows={4}
          variant="standard"
          error={!!error}
          helperText={error ? error.message : ""}
        />
      )}
    />
  );
}
