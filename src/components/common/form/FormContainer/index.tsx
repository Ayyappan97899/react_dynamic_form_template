/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid } from "@mui/material";
import FormElements from "../FormElements";

interface FormContainerProps {
  fields: {
    name: string;
    type: string;
    label: string;
    isRequired?: boolean;
    isDisabled?: boolean;
    size?: {
      lg?: number;
      sm?: number;
      md?: number;
      xs?: number;
    };
  }[];
  onChange: (e: any) => void;
  meta?: { [key: string]: any };
  formik: any;
  direction: "row" | "column";
}

const FormContainer = ({
  fields,
  onChange,
  meta,
  formik,
  direction,
}: FormContainerProps) => {
  return (
    <Grid container direction={direction} spacing={3}>
      {fields?.map((field, index: number) => {
        const { size, ...rest } = field;

        return (
          <Grid
            item
            key={field?.name}
            lg={size?.lg || 3}
            sm={size?.sm || 6}
            md={size?.md || 4}
            xs={size?.xs || 12}
          >
            <FormElements
              key={index}
              meta={meta}
              onChange={(event: any, selectValue: any) =>
                onChange({
                  event,
                  selectValue,
                  name: field?.name,
                  type: field?.type,
                  upload_path: "",
                  formik,
                })
              }
              formValues={formik.values}
              setFormValues={formik.setFieldValue}
              direction={direction}
              {...rest}
              onBlur={formik.handleBlur}
              touched={formik.touched}
              errors={formik.errors}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default FormContainer;
