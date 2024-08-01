import {
  FormControl,
  FormHelperText,
  FormLabel,
  SxProps,
  TextField,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

interface AppInputProps {
  type: string;
  label: string;
  name: string;
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: any) => void;
  formValues?: { [key: string]: any };
  errors?: { [key: string]: any };
  touched?: { [key: string]: any };
  fieldContainerSx?: SxProps;
  fieldSx?: SxProps;
  variant?: "outlined" | "filled" | "standard";
  helperText?: string;
  InputProps?: {
    readOnly?: boolean;
    [key: string]: any;
  };
  [key: string]: any; // To capture any other props
}

const AppInput = ({
  type,
  label,
  name,
  placeholder,
  isRequired = false,
  isDisabled = false,
  onChange,
  onBlur = () => {},
  formValues,
  errors,
  touched,
  fieldContainerSx = {},
  fieldSx = {},
  variant = "outlined",
  helperText = "",
  InputProps = {},
  ...rest
}: AppInputProps) => {
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
        type={type}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        error={isError}
        onWheel={(e: React.WheelEvent<HTMLInputElement>) =>
          (e.currentTarget as HTMLInputElement).blur()
        }
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          onBlur(e);
          setIsFocused(false);
        }}
        disabled={isDisabled}
        value={formValues?.[name]}
        sx={{
          marginTop: "8px",
          ".MuiInputBase-root.MuiOutlinedInput-root": {
            borderRadius: "6px",
          },
          ".MuiInputBase-input.MuiOutlinedInput-input": {
            padding: "14px",
          },
          ...fieldSx,
        }}
        variant={variant}
        helperText={helperText}
        InputProps={InputProps}
        {...rest}
      />
      {errors?.[name] && touched?.[name] && (
        <FormHelperText sx={{ mx: 0 }}>{errors?.[name]}</FormHelperText>
      )}
    </FormControl>
  );
};

export default AppInput;
