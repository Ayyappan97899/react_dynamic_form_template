import { Stack, SxProps } from "@mui/material";
import { ReactNode } from "react";

interface AppVStackProps {
  children: ReactNode;
  sx?: SxProps;
  spacing?: number;
  [key: string]: any; // To capture any other props
}

const AppVStack = ({ children, sx, spacing, ...rest }: AppVStackProps) => {
  return (
    <Stack sx={{ ...sx }} spacing={spacing} {...rest}>
      {children}
    </Stack>
  );
};

export default AppVStack;
