import {
  Autocomplete,
  FormControl,
  FormHelperText,
  FormLabel,
  SxProps,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

interface OptionType {
  id: number;
  label: string;
}

interface AppMultiSelectProps {
  label: string;
  name: string;
  meta: { [key: string]: any };
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  onChange: (event: any, value: OptionType[]) => void;
  onBlur?: (e: React.FocusEvent<HTMLDivElement, Element>) => void;
  formValues?: { [key: string]: any };
  touched?: { [key: string]: any };
  errors?: { [key: string]: any };
  fieldContainerSx?: SxProps;
  fieldSx?: SxProps;
  [key: string]: any; // To capture any other props
}

const AppMultiSelect = ({
  label,
  name,
  meta,
  placeholder,
  isRequired,
  isDisabled,
  errors,
  touched,
  onChange,
  onBlur = () => {},
  formValues,
  fieldContainerSx = {},
  fieldSx = {},
  ...rest
}: AppMultiSelectProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [initialSelect, setInitialSelect] = useState<OptionType[]>([]);

  useEffect(() => {
    const inititalData =
      meta?.[name]?.filter((data: any) =>
        formValues?.[name]?.some((value: any) => +data.id === +value)
      ) || [];
    setInitialSelect(inititalData);
  }, [meta, name, formValues]);

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
        multiple
        options={meta[name] || []}
        getOptionLabel={(option: OptionType) => option.label}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={onChange}
        value={initialSelect}
        limitTags={1}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          onBlur(e);
          setIsFocused(false);
        }}
        renderInput={(params) => (
          <TextField {...params} placeholder={placeholder} error={isError} />
        )}
        sx={{
          marginTop: "8px",
          "& .MuiOutlinedInput-root": {
            padding: "6.5px 39px 6.5px 9px",
            borderRadius: "6px",
          },

          "& .MuiAutocomplete-tag": {
            bgcolor: "gray.5",
            "& .MuiSvgIcon-root": {
              color: "primary.main",
              "&:hover": {
                color: "primary.dark",
              },
            },
          },
          ...fieldSx,
        }}
        disabled={isDisabled}
        {...rest}
      />
      {errors?.[name] && touched?.[name] && (
        <FormHelperText sx={{ mx: 0 }}>{errors?.[name]}</FormHelperText>
      )}
    </FormControl>
  );
};

export default AppMultiSelect;
