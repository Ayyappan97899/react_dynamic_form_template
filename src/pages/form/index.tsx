/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Container } from "@mui/material";
import { Form, Formik } from "formik";
import FormContainer from "src/components/common/form/FormContainer";
import { fields, meta, validationSchema } from "src/constant";
import useOnChangeHandler from "src/hooks/useOnChangeHandler";
import { getInitialFormValues } from "src/utils/common";

function FormPage() {
  const { onChange } = useOnChangeHandler();
  return (
    <Container sx={{ my: "24px" }}>
      <Formik
        initialValues={getInitialFormValues(fields)}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log("submit", values)}
      >
        {(formik) => (
          <Form>
            <FormContainer
              direction="row"
              fields={fields}
              onChange={onChange}
              meta={meta}
              formik={formik}
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

export default FormPage;
