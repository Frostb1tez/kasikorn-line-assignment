import qrScanIcon from "@/assets/images/qr-scan.png";
import transferIcon from "@/assets/images/transfer.png";
import walletIcon from "@/assets/images/wallet.png";
import { CardActions, IconButton, Typography, styled } from "@mui/material";
import React from "react";

const StyledCardActions = styled(CardActions)(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, 0.03)",
  borderTop: "1px solid rgba(0, 0, 0, 0.02)",
  borderRadius: "0 0 10px 10px",
  padding: 0,
  justifyContent: "space-between",
  marginTop: theme.spacing(3),
}));

const ActionButton = styled(IconButton)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  borderRadius: 0,
  padding: "14px 0",
  color: "#fff",
});

const ActionIcon = styled("img")({
  width: 24,
  height: 24,
  marginBottom: 4,
});

const ActionLabel = styled(Typography)({
  fontSize: "1.2rem",
  lineHeight: "1.4rem",
  fontWeight: 700,
  color: "inherit",
});

const AccountActions: React.FC = () => {
  return (
    <StyledCardActions>
      <ActionButton>
        <ActionIcon src={transferIcon} alt="withdrawal" />
        <ActionLabel>Withdrawal</ActionLabel>
      </ActionButton>
      <ActionButton>
        <ActionIcon src={qrScanIcon} alt="qr scan" />
        <ActionLabel>QR scan</ActionLabel>
      </ActionButton>
      <ActionButton>
        <ActionIcon src={walletIcon} alt="add money" />
        <ActionLabel>Add money</ActionLabel>
      </ActionButton>
    </StyledCardActions>
  );
};

export default AccountActions;
