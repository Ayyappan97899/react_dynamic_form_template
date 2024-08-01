import { lazy } from "react";
import { ARRAY_FORM_ROUTE, FORM_ROUTE, STEPPER_FORM_ROUTE } from "./url";
import { AppLoadable } from "src/components/common/AppLoadable";

const FormPage = AppLoadable(lazy(() => import("src/pages/form")));
const ArrayFormPage = AppLoadable(lazy(() => import("src/pages/arrayForm")));
const StepperFormPage = AppLoadable(
  lazy(() => import("src/pages/stepperForm"))
);

const FormRoutes = {
  children: [
    {
      path: FORM_ROUTE,
      element: <FormPage />,
    },
    {
      path: ARRAY_FORM_ROUTE,
      element: <ArrayFormPage />,
    },
    {
      path: STEPPER_FORM_ROUTE,
      element: <StepperFormPage />,
    },
  ],
};

export default FormRoutes;
