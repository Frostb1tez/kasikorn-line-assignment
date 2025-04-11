import { useEffect, useState } from "react";

export interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  accountNumber: string;
  provider?: string;
  color?: string;
  progress?: number;
  flags?: string[];
}

export interface RecentContact {
  id: string;
  name: string;
  imageUrl: string;
  isBank: boolean;
}

export interface Goal {
  id: string;
  title: string;
  status: string;
  color: string;
  provider: string;
  accountNumber?: string;
}

interface DashboardData {
  userName: string;
  accounts: Account[];
  recentContacts: RecentContact[];
  totalBalance: number;
  goals: Goal[];
}

export const useDashboard = () => {
  const [data] = useState<DashboardData>({
    userName: "Clare",
    accounts: [
      {
        id: "1",
        name: "Saving Account",
        type: "saving",
        balance: 62000.0,
        accountNumber: "568-2-81740-9",
        provider: "TestLab",
        color: "#00a1e2",
      },
      {
        id: "2",
        name: "Saving Account",
        type: "saving",
        balance: 8837999.0,
        accountNumber: "568-2-81740-9",
        provider: "TestLab",
        color: "#91c9ee",
      },
      {
        id: "3",
        name: "Credit Loan",
        type: "loan",
        balance: 300.1,
        accountNumber: "568-2-81740-9",
        color: "#ff8300",
      },
      {
        id: "4",
        name: "Travel New York",
        type: "goal",
        balance: 30000.0,
        accountNumber: "568-2-81740-9",
        provider: "TestLab",
        color: "#9c27b0",
        progress: 24,
      },
      {
        id: "5",
        name: "Need to repay",
        type: "loan",
        balance: 30000.0,
        accountNumber: "568-2-81740-9",
        color: "#3f51b5",
        flags: ["Disbursement", "Overdue"],
      },
    ],
    goals: [
      {
        id: "1",
        title: "My Salary",
        status: "In progress",
        color: "#00a1e2",
        provider: "TestLab",
      },
      {
        id: "2",
        title: "For My Dream",
        status: "In progress",
        color: "#ff8300",
        provider: "TestLab",
      },
      {
        id: "3",
        title: "For My Dream",
        status: "In progress",
        color: "#ffffff",
        provider: "TestLab",
        accountNumber: "9440 78•• •••• 3115",
      },
      {
        id: "4",
        title: "For My Dream",
        status: "In progress",
        color: "#91c9ee",
        provider: "TestLab",
        accountNumber: "9440 78•• •••• 3115",
      },
    ],
    recentContacts: [
      {
        id: "1",
        name: "Emily",
        imageUrl: "https://dummyimage.com/54x54/999/fff",
        isBank: false,
      },
      {
        id: "2",
        name: "AbcdEfghiJKlmN",
        imageUrl: "https://dummyimage.com/54x54/999/fff",
        isBank: true,
      },
      {
        id: "3",
        name: "Jone Kiersten",
        imageUrl: "https://dummyimage.com/54x54/999/fff",
        isBank: false,
      },
      {
        id: "4",
        name: "Emily",
        imageUrl: "https://dummyimage.com/54x54/999/fff",
        isBank: false,
      },
      {
        id: "5",
        name: "Emily",
        imageUrl: "https://dummyimage.com/54x54/999/fff",
        isBank: false,
      },
      {
        id: "6",
        name: "MarkYu Gonzales",
        imageUrl: "https://dummyimage.com/54x54/999/fff",
        isBank: true,
      },
    ],
    totalBalance: 8960299.1,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const refreshDashboard = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to refresh dashboard");
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    refreshDashboard,
  };
};
