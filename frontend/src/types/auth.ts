// ----------------------------------------------------------------------

export type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthResponse = {
  token: string;
};

export type UserInfo = {
  userId: string;
  name: string;
  greeting: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: UserInfo | null;
};

export type JWTContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: UserInfo | null;
  method: "jwt";
  login: (userId: string) => Promise<void>;
  logout: () => Promise<void>;
};

export type Flag = {
  flagType: string;
  flagValue: string;
  createdAt: string;
  updatedAt: string;
};

export type Account = {
  accountId: string;
  userId: string;
  type: string;
  currency: string;
  accountNumber: string;
  issuer: string;
  balance: number;
  color: string;
  isMainAccount: boolean;
  progress: number;
  flags: Flag[];
};

export type DebitCard = {
  id: string;
  userId: string;
  name: string;
  status: string;
  issuer: string;
  cardNumber: string;
  color: string;
  borderColor: string;
};

export type DebitCardResponse = {
  cards: DebitCard[];
  totalCount: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
};

export type Banner = {
  bannerId: string;
  userId: string;
  title: string;
  description: string;
  image: string;
};

export type Transaction = {
  transactionId: string;
  userId: string;
  name: string;
  image: string;
  isBank: boolean;
  amount: number;
  type: string;
};

export type TransactionResponse = {
  transactions: Transaction[];
  totalCount: number;
};

export type UserAggregateData = {
  user: UserInfo;
  account: Account[];
  debitCard: DebitCardResponse;
  banner: Banner;
  transaction: TransactionResponse;
};
