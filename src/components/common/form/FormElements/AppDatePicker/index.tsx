import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  SxProps,
} from "@mui/material";
import {
  DesktopDatePicker,
  LocalizationProvider,
  DesktopDatePickerProps,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

interface AppDatePickerProps {
  label: string;
  name: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  onChange: (e: any) => void;
  onBlur?: (e: any) => void;
  formValues?: { [key: string]: any };
  errors?: { [key: string]: any };
  touched?: { [key: string]: any };
  views?: DesktopDatePickerProps<Dayjs>["views"];
  disablePast?: boolean;
  fieldContainerSx?: SxProps;
  fieldSx?: SxProps;
  [key: string]: any; // To capture any other props
}

const AppDatePicker = ({
  label,
  name,
  isRequired,
  isDisabled = false,
  onChange,
  onBlur = () => {},
  formValues,
  errors,
  touched,
  views,
  disablePast,
  fieldContainerSx = {},
  fieldSx = {},
  ...rest
}: AppDatePickerProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const isError = touched?.[name] && Boolean(errors?.[name]);

  return (
    <FormControl
      fullWidth
      disabled={isDisabled}
      error={isError}
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            ".MuiOutlinedInput-root": {
              borderColor: isError ? "error.main" : undefined,
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: isError ? "error.main" : undefined,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: isError ? "error.main" : undefined,
              },
            },
          }}
          onBlur={() => {
            onBlur({
              target: {
                name,
              },
            });
            setIsFocused(false);
          }}
          onFocus={() => {
            setIsFocused(true);
          }}
        >
          <DesktopDatePicker
            value={formValues?.[name] ? dayjs(formValues[name]) : null}
            disablePast={disablePast}
            views={views}
            onChange={onChange}
            disabled={isDisabled}
            sx={{
              mt: "8px",
              "&.MuiFormControl-root.MuiTextField-root ": {
                width: "100%",
              },
              ".MuiInputBase-input.MuiOutlinedInput-input": {
                padding: "14px",
              },
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: isError ? "error.main" : undefined,
                borderRadius: "6px",
              },
              ...fieldSx,
            }}
            {...rest}
          />
        </Box>
      </LocalizationProvider>
      {errors?.[name] && touched?.[name] && (
        <FormHelperText sx={{ mx: 0 }} error>
          {errors?.[name]}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default AppDatePicker;
