/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Link,
  SxProps,
  Typography,
  useTheme,
} from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { useState } from "react";
import AppHStack from "src/components/common/stack/AppHStack";

interface AppFileInputProps {
  label: string;
  name: string;
  formValues?: { [key: string]: any };
  helperText?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  onChange: () => void;
  onBlur?: (e: any) => void;
  errors?: { [key: string]: any };
  touched?: { [key: string]: any };
  setFormValues?: any;
  fieldContainerSx?: SxProps;
  fieldSx?: SxProps;
  format?: string;
  arrayName?: string;
  arrayIndex?: number;
}

const AppFileInput = ({
  label,
  name,
  formValues = {},
  helperText = "",
  isRequired,
  isDisabled,
  onChange,
  onBlur = () => {},
  errors,
  touched,
  setFormValues,
  fieldContainerSx,
  fieldSx,
  format = "",
  arrayName,
  arrayIndex,
}: AppFileInputProps) => {
  const theme = useTheme();

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const listStyle = {
    // background: theme.palette.gray[5],
    padding: "5px 9px",
    borderRadius: "4px",
  };

  const ModifiedName = arrayName ? `${arrayName}[${arrayIndex}].${name}` : name;

  const removeHandler = () => {
    setFormValues(ModifiedName, "");
  };

  const files =
    (formValues?.[name] &&
      [formValues?.[name]]
        ?.filter((_: any) => _ !== undefined)
        ?.filter((_: any) => _ !== null)
        ?.map((file: any) => {
          const fileName =
            file?.url?.split("/") ||
            file?.image?.split("/") ||
            file?.file?.split("/") ||
            file?.name?.split("/");

          return (
            <li
              key={file?.id}
              style={{
                listStyleType: "none",
                background: theme.palette.grey[200],
                ...listStyle,
              }}
            >
              <AppHStack justifyContent="space-between">
                <Link
                  href={file?.url || file?.file}
                  target="_blank"
                  sx={{ textDecoration: "none" }}
                >
                  <Typography
                    sx={{
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      fontSize: "0.875rem",
                      color: "text.secondary",
                      width: "214px",
                    }}
                  >
                    {fileName?.[fileName?.length - 1]}
                  </Typography>
                </Link>
                <HighlightOffOutlinedIcon
                  style={{
                    cursor: "pointer",
                    fontSize: "18px",
                    color: theme.palette.primary.main,
                  }}
                  onClick={() => removeHandler()}
                />
              </AppHStack>
            </li>
          );
        })) ||
    [];

  const isError = touched?.[name] && Boolean(errors?.[name]);

  return (
    <FormControl
      error={isError}
      disabled={isDisabled}
      required={isRequired}
      fullWidth
      sx={{ ...fieldContainerSx }}
    >
      <FormLabel
        sx={{
          fontSize: "0.875rem",
          fontWeight: 500,
        }}
        focused={isFocused}
      >
        {label}
      </FormLabel>

      <AppHStack
        sx={{
          marginTop: "8px",
          width: "auto",
          position: "relative",
          border: `1px solid ${
            isError
              ? theme.palette.error.main
              : isFocused
              ? theme.palette.primary.main
              : "#00224B33"
          }`,
          borderRadius: "6px",
          padding: files?.length > 0 ? "9.2px 0px" : "11.9px 0px",
          ...fieldSx,
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <AppHStack
          justifyContent="space-between"
          sx={{ px: "10px", width: "100%" }}
        >
          <ul style={{ margin: "0px", padding: "0px" }}>{files}</ul>
          {files?.length === 0 && (
            <label
              htmlFor={isDisabled ? "" : name}
              style={{
                boxShadow: "none",
                fontSize: "12px",
                borderRadius: "6px",
                cursor: isDisabled ? "not-allowed" : "pointer",
                fontFamily: theme.typography.fontFamily,
                background: theme.palette.grey[200],
                padding: "6px 8px",
                opacity: isDisabled ? 0.5 : 1,
              }}
            >
              Browse
            </label>
          )}
        </AppHStack>
      </AppHStack>

      <input
        accept={format || "image/*"}
        id={name}
        type="file"
        name={name}
        style={{ display: "none" }}
        onChange={onChange}
        onBlur={(e) => onBlur(e)}
        multiple={false}
      />

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {errors?.[name] && touched?.[name] && (
        <FormHelperText error sx={{ mx: 0 }}>
          {errors?.[name]}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default AppFileInput;
