import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";

export default function MyDatePickerField({ label, control, name, width }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <DatePicker
            label={label}
            value={value || null} // Evita errores cuando `value` es `undefined`
            onChange={onChange} // Conecta el estado del formulario con el DatePicker
            slotProps={{
              textField: {
                sx: { width }, // Estilo aquí
                error: !!error,
                helperText: error ? error.message : "",
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
