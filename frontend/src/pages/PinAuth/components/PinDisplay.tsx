import { Stack } from "@mui/material";
import React from "react";
import { PinDot } from "./styles";

interface PinDisplayProps {
  pinLength: number;
  maxLength: number;
}

export const PinDisplay: React.FC<PinDisplayProps> = ({
  pinLength,
  maxLength,
}) => {
  return (
    <Stack direction="row" spacing={1}>
      {Array.from({ length: maxLength }).map((_, index) => (
        <PinDot key={index} filled={index < pinLength} />
      ))}
    </Stack>
  );
};
