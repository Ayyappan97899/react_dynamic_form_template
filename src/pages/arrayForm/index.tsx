import { Button, Container, IconButton, Typography } from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import useOnChangeHandler from "src/hooks/useOnChangeHandler";
import { fieldsForArray, meta, validationSchemaForArray } from "src/constant";
import {
  getInitialFormValues,
  getInitialFormValuesForArray,
} from "src/utils/common";
import AppVStack from "src/components/common/stack/AppVStack";
import AppHStack from "src/components/common/stack/AppHStack";
import FormContainerForArray from "src/components/common/form/FormContainerForArray";

function ArrayFormPage() {
  const { onChange } = useOnChangeHandler();
  return (
    <Container sx={{ my: "24px" }}>
      <Formik
        initialValues={getInitialFormValuesForArray(
          fieldsForArray,
          "qualification",
        )}
        validationSchema={validationSchemaForArray}
        onSubmit={(values) => console.log("submit", values)}
      >
        {(formik) => (
          <Form>
            <FieldArray
              name="qualification"
              render={(arrayHelpers) => {
                return (
                  <AppVStack sx={{ gap: "24px" }}>
                    {formik?.values?.qualification?.length > 0 &&
                      formik?.values?.qualification?.map((_values, index) => {
                        return (
                          <AppHStack key={index}>
                            <FormContainerForArray
                              direction="row"
                              fields={fieldsForArray}
                              onChange={onChange}
                              meta={meta}
                              formik={formik}
                              arrayName="qualification"
                              arrayIndex={index}
                            />
                            <IconButton
                              sx={{ mt: "25px" }}
                              onClick={() => arrayHelpers?.remove(index)}
                            >
                              <RemoveCircleOutlineIcon />
                            </IconButton>
                          </AppHStack>
                        );
                      })}
                    <AppVStack
                      sx={{ width: "fit-content" }}
                      onClick={() =>
                        arrayHelpers?.push(getInitialFormValues(fieldsForArray))
                      }
                    >
                      <Typography
                        variant="body2"
                        sx={{ mt: "18px", cursor: "pointer" }}
                        color={"primary.main"}
                      >
                        Add Qualification
                      </Typography>
                    </AppVStack>
                  </AppVStack>
                );
              }}
            />

            <Button
              sx={{ mt: "24px" }}
              type="button"
              color="primary"
              variant="contained"
              fullWidth
              onClick={() => formik.handleSubmit()}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default ArrayFormPage;
