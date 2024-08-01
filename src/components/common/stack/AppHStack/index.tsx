/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, SxProps } from "@mui/material";
import { ReactNode } from "react";

interface AppHStackProps {
  children: ReactNode;
  sx?: SxProps;
  spacing?: number;
  [key: string]: any;
}

const AppHStack = ({ children, sx, spacing, ...rest }: AppHStackProps) => {
  return (
    <Stack
      sx={{ flexDirection: "row", alignItems: "center", ...sx }}
      spacing={spacing}
      {...rest}
    >
      {children}
    </Stack>
  );
};

export default AppHStack;
