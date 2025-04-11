import BackspaceIcon from "@mui/icons-material/Backspace";
import { Box } from "@mui/material";
import React from "react";
import { PinKey, PinKeypad as StyledPinKeypad } from "./styles";

interface PinKeypadProps {
  onKeyPress: (value: string) => void;
  onDelete: () => void;
}

export const PinKeypad: React.FC<PinKeypadProps> = ({
  onKeyPress,
  onDelete,
}) => {
  return (
    <StyledPinKeypad>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <PinKey key={num} onClick={() => onKeyPress(num.toString())}>
          {num}
        </PinKey>
      ))}
      <Box
        component="span"
        sx={{
          display: "inline-block",
          width: "33.3%",
          height: 63,
        }}
      />
      <PinKey onClick={() => onKeyPress("0")}>0</PinKey>
      <PinKey onClick={onDelete}>
        <BackspaceIcon />
      </PinKey>
    </StyledPinKeypad>
  );
};
