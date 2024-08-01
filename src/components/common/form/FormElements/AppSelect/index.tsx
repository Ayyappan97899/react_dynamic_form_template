import {
  Autocomplete,
  FormControl,
  FormHelperText,
  FormLabel,
  SxProps,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface AppSelectProps {
  label: string;
  name: string;
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  meta: any;
  formValues: { [key: string]: any };
  onChange: (event: any, newValue: string | null) => void;
  onBlur?: (e: any) => void;
  touched?: { [key: string]: any };
  errors?: { [key: string]: any };
  fieldContainerSx?: SxProps;
  fieldSx?: SxProps;
  renderOption?: any;
  disableClearable?: boolean;
  variant?: any;
  [key: string]: any; // To capture any other props
}

const AppSelect = ({
  label,
  name,
  placeholder,
  isRequired,
  isDisabled = false,
  meta,
  formValues = {},
  onChange,
  touched,
  errors,
  fieldContainerSx = {},
  fieldSx = {},
  renderOption,
  disableClearable = true,
  variant = {},
  onBlur = () => {},
  ...rest
}: AppSelectProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  let selectedOption = meta?.[name]?.filter(
    (_: any) => +_?.id === +formValues?.[name],
  );

  selectedOption = selectedOption?.[0] || null;

  const isError = touched?.[name] && Boolean(errors?.[name]);

  return (
    <FormControl
      error={isError}
      disabled={isDisabled}
      fullWidth
      sx={{ ...fieldContainerSx }}
    >
      <FormLabel
        sx={{
          fontSize: "0.875rem",
          fontWeight: 500,
        }}
        required={isRequired}
        focused={isFocused}
      >
        {label}
      </FormLabel>
      <Autocomplete
        id={name}
        disablePortal
        disableClearable={disableClearable}
        getOptionLabel={(option) => option?.label || ""}
        options={meta?.[name] || []}
        onChange={onChange}
        value={selectedOption}
        disabled={isDisabled}
        multiple={false}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          onBlur(e);
          setIsFocused(false);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            {...variant}
            error={isError}
            placeholder={placeholder}
          />
        )}
        renderOption={renderOption}
        sx={{
          marginTop: "8px",
          "&.MuiAutocomplete-root .MuiOutlinedInput-root": {
            padding: "6.5px",
            borderRadius: "6px",
          },
          ...fieldSx,
        }}
        {...rest}
      />

      {errors?.[name] && touched?.[name] && (
        <FormHelperText sx={{ mx: 0 }}>{errors?.[name]}</FormHelperText>
      )}
    </FormControl>
  );
};

export default AppSelect;
