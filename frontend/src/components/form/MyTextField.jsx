import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

export default function MyTextField({
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
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <TextField
          sx={{ width: width }} // Se eliminó el objeto innecesario
          label={label}
          placeholder={placeholder}
          variant="standard"
          value={value} // Se usa el valor de field
          onChange={onChange} // Se usa el onChange de field
          onBlur={onBlur} // Maneja cuando el usuario deja el campo
          inputRef={ref} // Referencia para react-hook-form
          error={!!error} // Si hay un error, muestra el estado de error
          helperText={error ? error.message : ""} // Mensaje de error si existe
        />
      )}
    />
  );
}
