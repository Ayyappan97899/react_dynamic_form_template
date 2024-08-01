/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  SxProps,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

interface AppTimePickerProps {
  label: string;
  name: string;
  onChange: (value: any) => void;
  onBlur?: (e: any) => void;
  formValues?: { [key: string]: any };
  errors?: { [key: string]: any };
  touched?: { [key: string]: any };
  isDisabled?: boolean;
  isRequired?: boolean;
  fieldContainerSx?: SxProps;
  fieldSx?: SxProps;
  [key: string]: any; // To capture any other props
}

export default function AppTimePicker({
  label,
  name,
  formValues,
  errors,
  touched,
  onChange,
  onBlur = () => {},
  isDisabled = false,
  isRequired,
  fieldContainerSx,
  fieldSx,
  ...rest
}: AppTimePickerProps) {
  const timePickRef = useRef(null);

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const isError = touched?.[name] && Boolean(errors?.[name]);

  const handleClickOutside = () => {
    if (timePickRef.current) {
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
      key={name}
      fullWidth
      error={isError}
      sx={{ ...fieldContainerSx }}
      disabled={isDisabled}
      ref={timePickRef}
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
          <TimePicker
            name={name}
            value={formValues?.[name] ? dayjs(formValues?.[name] || "") : null}
            onChange={onChange}
            disabled={isDisabled}
            sx={{
              mt: "8px",
              width: "100%",
              "& .MuiInputBase-input.MuiOutlinedInput-input": {
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
