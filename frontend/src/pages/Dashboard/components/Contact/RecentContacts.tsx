import TextMaxLine from "@/components/TextMaxLine";
import { Transaction } from "@/types/auth";
import { Avatar, Box, Stack, styled } from "@mui/material";
import React from "react";

interface RecentContactsProps {
  transactions: Transaction[];
}

const ContactAvatar = styled(Avatar)(({ theme }) => ({
  width: 54,
  height: 54,
  marginBottom: theme.spacing(1),
  backgroundColor: theme.palette.grey[100],
  color: theme.palette.text.secondary,
}));

const ContactContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(1),
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius,
  },
  width: 60,
}));

const RecentContacts: React.FC<RecentContactsProps> = ({ transactions }) => {
  return (
    <Box>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
        }}
      >
        {transactions.map((transaction) => (
          <ContactContainer key={transaction.transactionId}>
            <ContactAvatar>
              <img src={transaction.image} alt={transaction.name} />
            </ContactAvatar>
            <TextMaxLine line={2} variant="body2">
              {transaction.name}
            </TextMaxLine>
          </ContactContainer>
        ))}
      </Stack>
    </Box>
  );
};

export default RecentContacts;
