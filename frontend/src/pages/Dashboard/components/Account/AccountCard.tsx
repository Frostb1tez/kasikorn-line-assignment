import { Account } from "@/types/auth";
import { AccountType } from "@/utils/account";
import { formatCurrency } from "@/utils/currency";
import {
  Box,
  Card,
  CardContent,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import AccountActions from "./AccountActions";
import AccountMenu from "./AccountMenu";
import AccountProgress from "./AccountProgress";

interface AccountCardProps {
  account: Account;
}

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: "transparent",
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(2),
  position: "relative",
}));

const AccountFlag = styled(Box)(({ theme }) => ({
  display: "inline-block",
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(0.5),
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  fontSize: "0.75rem",
  color: theme.palette.text.white,
}));

const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
  const accountName = useMemo(() => {
    if (account.type === AccountType.SAVING) {
      return "Saving Account";
    }
    return account.accountNumber;
  }, [account]);

  return (
    <StyledCard sx={{ bgcolor: account.color }}>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Typography variant="h6" color="text.white" gutterBottom>
              {accountName}
            </Typography>
            <Typography variant="h4" color="text.white" gutterBottom>
              {formatCurrency(account.balance, account.currency)}
            </Typography>
            <Box>
              {account.flags?.map((flag, index) => (
                <AccountFlag key={index}>{flag.flagValue}</AccountFlag>
              ))}
            </Box>
            <Typography
              variant="body2"
              color="text.white"
              sx={{ opacity: 0.8 }}
            >
              {account.accountNumber}
            </Typography>
            {account.issuer && (
              <Typography
                variant="body2"
                color="text.white"
                sx={{ opacity: 0.8 }}
              >
                Powered by {account.issuer}
              </Typography>
            )}
          </Box>
          <Box>
            <AccountMenu isMainAccount={account.isMainAccount} />
          </Box>
        </Stack>

        {account.progress && <AccountProgress progress={account.progress} />}
      </CardContent>
      {account.isMainAccount && <AccountActions />}
    </StyledCard>
  );
};

export default AccountCard;
