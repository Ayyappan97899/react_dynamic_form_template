/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormHelperText,
  FormLabel,
  SxProps,
  Typography,
  useTheme,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import AppHStack from "src/components/common/stack/AppHStack";
import AppVStack from "src/components/common/stack/AppVStack";

interface AppDropZoneProps {
  label?: string;
  name: string;
  formValues?: { [key: string]: any };
  errors?: { [key: string]: any };
  touched?: { [key: string]: any };
  acceptFile?: string;
  setFormValues?: any;
  isRequired?: boolean;
  isDisabled?: boolean;
  fieldContainerSx?: SxProps;
  onDropHandler?: (prop: any) => void;
  isLoading?: boolean;
  arrayName?: string;
  arrayIndex?: number;
}

const AppDropZone = ({
  label,
  name,
  formValues,
  errors,
  touched,
  setFormValues,
  isRequired,
  isDisabled,
  acceptFile,
  fieldContainerSx,
  onDropHandler = () => {},
  isLoading = false,
  arrayName,
  arrayIndex,
}: AppDropZoneProps) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const isError = touched?.[name] && Boolean(errors?.[name]);

  const baseStyle = useMemo(() => {
    return {
      padding: "40px 8px",
      borderRadius: "6px",
      marginTop: "8px",
    };
  }, []);

  const listStyle = {
    borderRadius: "3px",
  };

  const style = useMemo(
    () => ({
      ...baseStyle,
      border: `1px dashed ${
        isError
          ? theme.palette.error.main
          : isFocused
          ? theme.palette.primary.main
          : "#CBD2DC"
      }`,
    }),
    [isFocused, theme, isError, baseStyle]
  );

  const ModifiedName = arrayName ? `${arrayName}[${arrayIndex}].${name}` : name;

  const acceptFileObj = {};

  if (Object?.keys(acceptFile || {})?.length > 0) {
    Object.assign(acceptFileObj, acceptFile);
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      ...acceptFileObj,
    },
    disabled: isDisabled,
    onDrop: (prop) => {
      // if (filesData?.length < maxLength) {
      setFormValues(ModifiedName, [...(formValues?.[name] || []), ...prop]);
      onDropHandler(prop);
      // }
    },
  });

  const removeHandler = (index: number) => {
    const files = [...(formValues?.[name] || [])];
    files?.splice(index, 1);
    setFormValues(ModifiedName, [...files]);
  };

  function getFilenameFromUrl(url: string) {
    const urlParts = url?.split("/");
    const fileName = urlParts?.[urlParts?.length - 1];

    return fileName || null;
  }

  const files = formValues?.[name]?.map((file: any, index: number) => (
    <li key={file?.path} style={{ listStyleType: "none", ...listStyle }}>
      <AppHStack
        sx={{
          background: theme.palette.grey[200],
          borderRadius: "6px",
          padding: "7px 12px",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            width: "200px",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {getFilenameFromUrl(file?.file) || file?.path}
        </Typography>

        <HighlightOffIcon
          sx={{
            width: "15px",
            height: "15px",
            cursor: "pointer",
            color: theme.palette.primary.main,
          }}
          onClick={() => removeHandler(index)}
        />
      </AppHStack>
    </li>
  ));

  return (
    <FormControl
      error={isError}
      fullWidth
      disabled={isDisabled}
      sx={{
        ...fieldContainerSx,
      }}
    >
      {label && (
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
      )}

      <div style={{ pointerEvents: isLoading ? "none" : "auto" }}>
        <div
          {...getRootProps({
            style,
          })}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          <input {...getInputProps()} />
          <AppVStack
            sx={{ alignItems: "center", justifyContent: "center" }}
            alignItems="center"
            justifyContent="center"
            spacing={1}
          >
            <AppHStack>
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: isDisabled ? "text.disabled" : "text.secondary",
                }}
              >
                Drag and drop file here or
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: isDisabled ? "text.disabled" : "primary.main",
                  ml: "5px",
                  cursor: "pointer",
                }}
              >
                click
              </Typography>
            </AppHStack>
            <CloudUploadOutlinedIcon
              sx={{
                fontSize: "42px",
                color: isDisabled ? "text.disabled" : "grey.500",
              }}
            />
          </AppVStack>
        </div>
      </div>

      {formValues?.[name]?.length > 0 && (
        <AppHStack
          sx={{ gap: "10px", mt: "4px", overflowX: "auto", padding: "4px" }}
        >
          {files}
        </AppHStack>
      )}

      {errors?.[name] && touched?.[name] && (
        <FormHelperText sx={{ mx: 0 }} error>
          {errors?.[name]}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default AppDropZone;
