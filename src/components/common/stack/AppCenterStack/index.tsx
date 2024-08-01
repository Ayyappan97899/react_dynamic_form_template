import { Stack, SxProps } from "@mui/material";
import { ReactNode } from "react";

interface AppCenterStackProps {
  children: ReactNode;
  sx?: SxProps;
  [key: string]: any;
}

const AppCenterStack = ({ children, sx, ...rest }: AppCenterStackProps) => {
  return (
    <Stack
      sx={{ alignItems: "center", justifyContent: "center", ...sx }}
      {...rest}
    >
      {children}
    </Stack>
  );
};

export default AppCenterStack;
