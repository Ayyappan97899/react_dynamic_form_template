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
  arrayName: string;
  arrayIndex: number;
}

const FormContainerForArray = ({
  fields,
  onChange,
  meta,
  formik,
  direction,
  arrayName = "",
  arrayIndex,
}: FormContainerProps) => {
  console.log("errors", formik.errors);

  return (
    <Grid container direction={direction} spacing={3}>
      {fields?.map((field, index: number) => {
        const { size, ...rest } = field;

        const name = field?.name;

        return (
          <Grid
            item
            key={name}
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
                  name: `${arrayName}[${arrayIndex}].[${field?.name}]`,
                  type: field?.type,
                  upload_path: "",
                  formik,
                })
              }
              formValues={formik.values?.[arrayName]?.[arrayIndex]}
              setFormValues={formik.setFieldValue}
              direction={direction}
              {...rest}
              arrayName={arrayName}
              arrayIndex={arrayIndex}
              onBlur={formik.handleBlur}
              touched={formik.touched?.[arrayName]?.[arrayIndex]}
              errors={formik.errors?.[arrayName]?.[arrayIndex]}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default FormContainerForArray;
