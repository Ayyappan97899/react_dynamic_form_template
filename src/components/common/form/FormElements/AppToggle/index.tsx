/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
  SxProps,
  Typography,
  useTheme,
} from "@mui/material";
import AppVStack from "src/components/common/stack/AppVStack";

interface AppToggleProps {
  label: string;
  name: string;
  formValues?: { [key: string]: any };
  onChange: () => void;
  onBlur?: (e: any) => void;
  helpText?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  ariaLabel?: boolean;
  errors?: { [key: string]: any };
  touched?: { [key: string]: any };
  fieldContainerSx?: SxProps;
  fieldSx?: SxProps;
  [key: string]: any; // To capture any other props
}

const AppToggle = ({
  label,
  name,
  formValues,
  onChange,
  onBlur = () => {},
  helpText = "",
  isRequired,
  isDisabled,
  ariaLabel = false,
  fieldContainerSx,
  fieldSx,
  errors,
  touched,
  ...restProps
}: AppToggleProps) => {
  const theme = useTheme();

  const sxStyles = {
    "& .MuiSwitch-switchBase": {
      "&.Mui-checked": {
        color: theme.palette.primary.main,
        "& + .MuiSwitch-track": {
          backgroundColor: theme.palette.primary.light,
        },
      },
    },
  };

  const isError = touched?.[name] && Boolean(errors?.[name]);

  if (label && ariaLabel === false) {
    return (
      <FormControl
        error={isError}
        sx={{
          ...fieldContainerSx,
          height: "100%",
          justifyContent: isError ? "flex-end" : "center",
        }}
      >
        <AppVStack>
          <FormControlLabel
            sx={{
              height: "100%",
              alignItems: "baseline",
              fontSize: "0.875rem",
              color: isDisabled ? "text.disabled" : "text.secondary",
              fontWeight: 500,
              ".MuiTypography-root": {
                fontSize: "0.875rem",
                fontWeight: 500,
              },
            }}
            control={
              <Switch
                {...restProps}
                name={name}
                onChange={onChange}
                onBlur={(e) => onBlur(e)}
                checked={formValues?.[name] || false}
                sx={{ ...sxStyles, ...fieldSx }}
              />
            }
            label={label}
            required={isRequired}
            disabled={isDisabled}
          />
          {helpText && (
            <Typography
              sx={{ textTransform: "none" }}
              variant="overline"
              color="gray.1"
            >
              {helpText}
            </Typography>
          )}
          {errors?.[name] && touched?.[name] && (
            <FormHelperText error sx={{ mx: 0 }}>
              {errors?.[name]}
            </FormHelperText>
          )}
        </AppVStack>
      </FormControl>
    );
  }

  // when there is no label to be shown set aria-label
  const Arialabel = { inputProps: { "aria-label": label } };
  return (
    <Switch
      {...Arialabel}
      {...restProps}
      onChange={onChange}
      onBlur={(e) => onBlur(e)}
      checked={formValues?.[name] || false}
      sx={{ ...sxStyles, ...fieldSx }}
    />
  );
};

export default AppToggle;
