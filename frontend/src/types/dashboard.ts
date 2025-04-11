import { Goal } from "@/hooks/useDashboard";

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

export interface DashboardData {
  userName: string;
  accounts: Account[];
  recentContacts: RecentContact[];
  totalBalance: number;
  goals: Goal[];
}

export interface DashboardState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
}
