import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Box, Divider, useTheme } from "@mui/material";
import AppVStack from "src/components/common/stack/AppVStack";

interface StepperContainerProps {
  stepsData: any;
  activeStep: number;
}

export default function StepperContainer({
  stepsData,
  activeStep,
}: StepperContainerProps) {
  const theme = useTheme();

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          boxShadow: "0px 3px 6px #00000029",
          padding: "26px 0px",
        }}
      >
        <Stepper
          //   orientation={orientation}
          activeStep={activeStep}
          sx={{ width: "60%", m: "auto" }}
        >
          {stepsData?.map(
            (
              data: { label: string; content: React.ReactNode },
              index: number,
            ) => (
              <Step key={index}>
                <StepLabel
                  color="inherit"
                  sx={{
                    ".MuiStepIcon-root.Mui-active": {
                      color: theme.palette.primary.main,
                    },
                    ".MuiStepIcon-root.Mui-completed": {
                      color: theme.palette.success.light,
                    },
                    ".MuiStepIcon-root": {
                      color: theme.palette.grey[400],
                    },
                  }}
                >
                  {data?.label}
                </StepLabel>
              </Step>
            ),
          )}
        </Stepper>
      </Box>

      <>
        <AppVStack sx={{ mt: "18px" }}>
          {stepsData?.[activeStep]?.content}
        </AppVStack>
        <Divider sx={{ mt: "24px" }} />
      </>
    </Box>
  );
}
