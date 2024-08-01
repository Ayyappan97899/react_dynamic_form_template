/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Container } from "@mui/material";
import { useState } from "react";
import { Form, Formik } from "formik";
import useOnChangeHandler from "src/hooks/useOnChangeHandler";
import ContactInformation from "./ContactInformation";
import {
  contactInformationInitialValues,
  contactInformationValidationSchema,
  orgInformationInitialValues,
  orgInformationValidationSchema,
} from "src/constant";
import OrgInformation from "./OrgInformation";
import StepperContainer from "src/components/common/form/Stepper";
import AppHStack from "src/components/common/stack/AppHStack";

const StepperPage = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const { onChange } = useOnChangeHandler();

  const steps = (props?: any) => [
    {
      label: "Contact Information",
      content: <ContactInformation {...props} />,
      validationSchema: contactInformationValidationSchema,
    },
    {
      label: "Organization Details",
      content: <OrgInformation {...props} />,
      validationSchema: orgInformationValidationSchema,
    },
  ];

  const isLastStep = () => {
    return activeStep === steps().length - 1;
  };

  const handlePrev = () => {
    setActiveStep(Math.max(activeStep - 1, 0));
  };

  const handleNext = () => [
    setActiveStep(Math.min(activeStep + 1, steps().length - 1)),
  ];

  const handleCancel = () => {};

  const handleSubmit = (values: any, formik: any) => {
    const { setSubmitting } = formik;

    if (!isLastStep()) {
      setSubmitting(false);
      handleNext();
      return;
    }

    console.log("submit", values);

    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  };

  return (
    <Container sx={{ my: "24px" }}>
      <Formik
        initialValues={{
          ...contactInformationInitialValues,
          ...orgInformationInitialValues,
        }}
        validationSchema={steps()[activeStep]?.validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <StepperContainer
              stepsData={steps({ onChange, formik })}
              activeStep={activeStep}
            />
            <AppHStack
              sx={{
                justifyContent: "flex-end",
                pt: 2,
                gap: "10px",
              }}
            >
              <Button
                variant="outlined"
                size="large"
                sx={{ mr: 1, boxShadow: "none" }}
                onClick={handleCancel}
              >
                CANCEL
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                disabled={activeStep === 0 || formik?.isSubmitting}
                onClick={handlePrev}
                sx={{ mr: 1 }}
              >
                BACK
              </Button>

              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 1 }}
                disabled={formik?.isSubmitting}
                type="submit"
              >
                {isLastStep() ? "SUBMIT" : "NEXT"}
              </Button>
            </AppHStack>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
export default StepperPage;
