/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormHelperText,
  FormLabel,
  SxProps,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

interface AppTextAreaProps {
  label: string;
  name: string;
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  formValues: { [key: string]: any };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent) => void;
  errors?: { [key: string]: any };
  touched?: { [key: string]: any };
  rows?: number;
  fieldSx?: SxProps;
  fieldContainerSx?: SxProps;
  [key: string]: any; // To capture any other props
}

const AppTextArea = ({
  label,
  name,
  placeholder,
  isRequired,
  isDisabled,
  formValues,
  onChange,
  onBlur = () => {},
  errors,
  touched,
  rows = 4,
  fieldSx,
  fieldContainerSx,
  ...rest
}: AppTextAreaProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

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
      <TextField
        multiline
        rows={rows}
        name={name}
        value={formValues?.[name] || ""}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          onBlur(e);
          setIsFocused(false);
        }}
        placeholder={placeholder}
        error={isError}
        disabled={isDisabled}
        required={isRequired}
        sx={{
          mt: "8px",
          ".MuiInputBase-root.MuiOutlinedInput-root": {
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

export default AppTextArea;
