/* eslint-disable @typescript-eslint/no-explicit-any */
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DateTimePicker,
  DateTimePickerProps,
} from "@mui/x-date-pickers/DateTimePicker";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  SxProps,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useRef, useState } from "react";

interface AppDateAndTimePickerProps {
  label: string;
  name: string;
  onChange: () => void;
  onBlur?: (e: any) => void;
  formValues?: { [key: string]: any };
  errors?: { [key: string]: any };
  touched?: { [key: string]: any };
  isRequired?: boolean;
  isDisabled?: boolean;
  disablePast?: boolean;
  views?: DateTimePickerProps<Dayjs>["views"];
  fieldContainerSx?: SxProps;
  fieldSx?: SxProps;
  [key: string]: any; // To capture any other props
}

export default function AppDateAndTimePicker({
  label,
  name,
  onChange,
  onBlur = () => {},
  formValues,
  errors,
  touched,
  isRequired = false,
  isDisabled = false,
  disablePast,
  views,
  fieldContainerSx = {},
  fieldSx = {},
  ...rest
}: AppDateAndTimePickerProps) {
  const dateAndtimePickRef = useRef(null);

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const isError = touched?.[name] && Boolean(errors?.[name]);

  const handleClickOutside = () => {
    if (dateAndtimePickRef.current) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <FormControl
      ref={dateAndtimePickRef}
      fullWidth
      error={isError}
      sx={{ ...fieldContainerSx }}
      disabled={isDisabled}
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
            mt: "8px",
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
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            onBlur({
              target: {
                name,
              },
            });
            setIsFocused(false);
          }}
        >
          <DateTimePicker
            value={formValues?.[name] ? dayjs(formValues?.[name]) : null}
            onChange={onChange}
            disabled={isDisabled}
            views={views}
            disablePast={disablePast}
            sx={{
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
        <FormHelperText sx={{ mx: 0 }}>{errors?.[name]}</FormHelperText>
      )}
    </FormControl>
  );
}
