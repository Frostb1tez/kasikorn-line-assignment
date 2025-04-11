import LoadingScreen from "@/components/LoadingScreen";
import { useGetUserAggregate } from "@/hooks/userUserAggregate";
import { Container, Stack } from "@mui/material";
import React from "react";
import { AccountCard } from "./components/Account";
import {
  BannerCard,
  TotalBalanceLink,
  WelcomeMessage,
} from "./components/Common";
import { RecentContacts } from "./components/Contact";
import CreditCards from "./components/CreditCard/CreditCards";

const Dashboard: React.FC = () => {
  const { data: aggregate, isLoading: aggregateLoading } =
    useGetUserAggregate();

  if (aggregateLoading || !aggregate) {
    return <LoadingScreen />;
  }

  const savingAccounts = aggregate.account.filter(
    (account) => account.type === "saving-account"
  );
  const otherAccounts = aggregate.account.filter(
    (account) => account.type !== "saving-account"
  );
  const isMainSavingAccount = savingAccounts.find(
    (account) => account.isMainAccount
  );
  const remainingSavingAccounts = savingAccounts.filter(
    (account) => !account.isMainAccount
  );

  return (
    <Container maxWidth={false}>
      <Stack spacing={3}>
        <WelcomeMessage greetingMessage={aggregate.user.greeting} />

        {isMainSavingAccount && (
          <>
            <AccountCard
              key={isMainSavingAccount.accountId}
              account={isMainSavingAccount}
            />
            <RecentContacts transactions={aggregate.transaction.transactions} />
            <CreditCards debitCards={aggregate.debitCard.cards} />
          </>
        )}

        {remainingSavingAccounts?.map((account) => (
          <AccountCard key={account.accountId} account={account} />
        ))}

        {otherAccounts?.map((account) => (
          <AccountCard key={account.accountId} account={account} />
        ))}

        <BannerCard banner={aggregate.banner} />
        <TotalBalanceLink />
      </Stack>
    </Container>
  );
};

export default Dashboard;
