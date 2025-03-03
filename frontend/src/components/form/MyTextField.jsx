import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

export default function MyTextField({ label, placeholder, name, control }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          variant="standard"
          placeholder={placeholder}
          error={!!error}
          helperText={error ? error.message : ""}
        />
      )}
    />
  );
}
