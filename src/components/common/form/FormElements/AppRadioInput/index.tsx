/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  SxProps,
} from "@mui/material";
import { ChangeEvent } from "react";
import AppVStack from "src/components/common/stack/AppVStack";

interface AppRadioInputProps {
  label: string;
  name: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  formValues: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: any) => void;
  meta: any;
  errors?: any;
  touched?: any;
  fieldContainerSx?: SxProps;
  [key: string]: any; // To capture any other props
}

function AppRadioInput({
  label,
  name,
  isRequired,
  isDisabled,
  formValues,
  onChange,
  onBlur = () => {},
  meta,
  errors,
  touched,
  fieldContainerSx,
  ...rest
}: AppRadioInputProps) {
  const isError = touched?.[name] && Boolean(errors?.[name]);

  return (
    <FormControl
      error={isError}
      fullWidth
      disabled={isDisabled}
      sx={{ ...fieldContainerSx, height: "100%" }}
    >
      <FormLabel
        sx={{
          fontSize: "0.875rem",
          fontWeight: 500,
        }}
        required={isRequired}
      >
        {label}
      </FormLabel>
      <AppVStack sx={{ justifyContent: "space-between", height: "100%" }}>
        <RadioGroup
          {...rest}
          value={formValues?.[name] || null}
          onChange={onChange}
          onBlur={(e) => {
            onBlur(e);
          }}
        >
          <Stack sx={{ flexDirection: "row" }}>
            {meta?.[name]?.map(
              (opt: { label: string; id: string | number }) => {
                return (
                  <FormControlLabel
                    key={opt?.id}
                    label={opt?.label}
                    value={opt?.id}
                    control={<Radio color="primary" />}
                  />
                );
              }
            )}
          </Stack>
        </RadioGroup>
        {errors?.[name] && touched?.[name] && (
          <FormHelperText
            sx={{
              mx: 0,
            }}
          >
            {errors?.[name]}
          </FormHelperText>
        )}
      </AppVStack>
    </FormControl>
  );
}

export default AppRadioInput;
