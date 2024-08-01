/* eslint-disable @typescript-eslint/no-explicit-any */
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Box, FormHelperText, Typography, useTheme } from "@mui/material";
import { useState } from "react";

interface AppRichTextEditorProps {
  label: string;
  name: string;
  formValues: { [key: string]: any };
  errors?: { [key: string]: any };
  touched?: { [key: string]: any };
  isRequired?: boolean;
  isDisabled?: boolean;
  onChange: (event: any, data: any) => void;
  onBlur?: (e: any) => void;
}

function AppRichTextEditor({
  label,
  name,
  formValues,
  errors,
  touched,
  isRequired,
  isDisabled,
  onChange,
  onBlur = () => {},
}: AppRichTextEditorProps) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Configuration to disable media features
  const editorConfig = {
    toolbar: {
      items: ["heading", "|", "bold", "italic", "|", "undo", "redo"],
    },
  };

  const isError = touched?.[name] && Boolean(errors?.[name]);

  return (
    <Box>
      <Typography
        sx={{
          fontSize: "0.875rem",
          fontWeight: 500,
          color: isError
            ? "error.main"
            : isDisabled
            ? "text.disabled"
            : isFocused
            ? "primary.main"
            : "text.secondary",
        }}
      >
        {`${label} ${isRequired ? "*" : ""}`}
      </Typography>
      <CKEditor
        id={name}
        editor={ClassicEditor}
        disabled={isDisabled}
        config={editorConfig} // Pass the custom configuration
        data={formValues?.[name] || ""}
        onChange={(_event, editor) => {
          const data = editor.getData();
          const eventWithTarget = {
            target: {
              value: data,
            },
          };
          onChange(eventWithTarget, data);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          onBlur({
            target: {
              name: name,
            },
          });
          setIsFocused(false);
        }}
      />
      {errors?.[name] && touched?.[name] && (
        <FormHelperText error sx={{ mx: 0 }}>
          {errors?.[name]}
        </FormHelperText>
      )}
      <style>{`
        .ck.ck-reset{
          margin-top:8px;
        }
        .ck.ck-toolbar{
          background:transparent;
        }
        .ck-rounded-corners .ck.ck-editor__top .ck-sticky-panel .ck-sticky-panel__content, .ck.ck-editor__top .ck-sticky-panel .ck-sticky-panel__content.ck-rounded-corners{
          border-radius:6px;
          border-bottom-left-radius:0px;
          border-bottom-right-radius:0px;
          border:solid ${
            isError
              ? theme.palette.error.main
              : isFocused
              ? theme.palette.primary.main
              : "rgba(0, 0, 0, 0.23)"
          };
          border-width:1px 1px 0;
        }
        .ck-rounded-corners .ck.ck-editor__main>.ck-editor__editable, .ck.ck-editor__main>.ck-editor__editable.ck-rounded-corners{
          border-radius:6px;
          border-top-left-radius:0px;
          border-top-right-radius:0px;
          border:solid ${
            isError
              ? theme.palette.error.main
              : isFocused
              ? theme.palette.primary.main
              : "rgba(0, 0, 0, 0.23)"
          };
          border-width:1px 1px 1px;
        }
        .ck-editor__editable_inline {
          height: 30vh;
          overflow: 'auto';
        }
      `}</style>
    </Box>
  );
}

export default AppRichTextEditor;
