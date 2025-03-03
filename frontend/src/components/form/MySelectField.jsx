import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";

export default function MySelectField({
  width,
  label,
  name,
  control,
  options = [
    { value: "open", label: "Open" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ],
}) {
  return (
    <FormControl variant="standard" sx={{ width }}>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select value={value} onChange={onChange}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
}
