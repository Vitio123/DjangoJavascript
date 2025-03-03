import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

export default function MyMultilineField({
  label,
  placeholder,
  name,
  control,
  width,
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TextField
          sx={{ width }} // Corrección aquí
          label={label}
          multiline
          rows={1}
          placeholder={placeholder}
          variant="standard"
          value={value} // Se usa el valor del field
          onChange={onChange} // Se usa el onChange del field
          error={!!error}
          helperText={error ? error.message : ""}
        />
      )}
    />
  );
}
