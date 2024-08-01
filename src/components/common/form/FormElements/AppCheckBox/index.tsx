/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  SxProps,
  useTheme,
} from "@mui/material";
import { CSSProperties } from "react";

interface AppCheckBoxProps {
  label: string;
  name: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  onChange: (e: any) => void;
  onBlur?: (e: React.FocusEvent) => void;
  formValues?: { [key: string]: any };
  errors?: { [key: string]: any };
  touched?: { [key: string]: any };
  fieldContainerSx?: SxProps;
  fieldSx?: CSSProperties;
  checkBoxSx?: SxProps;
  direction?: string;
  [key: string]: any; // To capture any other props
}

const AppCheckbox = ({
  label,
  name,
  isRequired,
  isDisabled = false,
  onChange,
  onBlur = () => {},
  formValues,
  errors,
  touched,
  fieldContainerSx = {},
  fieldSx = {},
  checkBoxSx = {},
  ...rest
}: AppCheckBoxProps) => {
  const theme = useTheme();

  const isError = touched?.[name] && Boolean(errors?.[name]);
  return (
    <FormControl
      sx={{
        ...fieldContainerSx,
        height: "100%",
        justifyContent: isError ? "flex-end" : "center",
      }}
      disabled={isDisabled}
      error={isError}
    >
      <FormControlLabel
        control={
          <Checkbox
            sx={{
              ...checkBoxSx,
              color: isError
                ? theme.palette.error.main
                : theme.palette.text.primary,
              borderRadius: "6px",
            }}
            onBlur={(e) => onBlur(e)}
          />
        }
        checked={formValues?.[name] || false}
        name={name}
        onChange={onChange}
        label={label}
        disabled={isDisabled}
        required={isRequired}
        sx={{
          fontSize: "0.875rem",
          fontWeight: 500,
          color: isError
            ? theme.palette.error.main
            : isDisabled
            ? theme.palette.text.disabled
            : theme.palette.text.secondary,
          [`& .MuiTypography-root`]: {
            fontSize: "0.875rem",
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

export default AppCheckbox;
