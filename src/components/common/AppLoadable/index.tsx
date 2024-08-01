/* eslint-disable react/display-name */
import { Suspense } from "react";
import AppCenterStack from "src/components/common/stack/AppCenterStack";

export const AppLoadable = (Component: any) => (props: any) => {
  return (
    <Suspense
      fallback={
        <AppCenterStack sx={{ height: "100vh" }}>Loading...</AppCenterStack>
      }
    >
      <Component {...props} />
    </Suspense>
  );
};
