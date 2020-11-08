import React from "react";
import { Box } from "@chakra-ui/core";

export type WrapperVariant = "small" | "regular";
interface WrapperProps {
  variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box
      width="100%"
      mt="8"
      maxWidth={variant === "regular" ? "800px" : "400px"}
      mx="auto"
    >
      {children}
    </Box>
  );
};
