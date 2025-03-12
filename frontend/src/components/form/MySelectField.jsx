import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";
import { FormHelperText } from "@mui/material";

export default function MySelectField({
  width,
  label,
  name,
  control,
  options,
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormControl variant="standard" sx={{ width }}>
          <InputLabel>{label}</InputLabel>
          <Select value={value} onChange={onChange} error={!!error}>
            {options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{error?.massage}</FormHelperText>
        </FormControl>
      )}
    />
  );
}
