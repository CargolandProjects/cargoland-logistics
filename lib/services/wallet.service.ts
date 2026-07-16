import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import { APIResponse } from "./auth.service";

interface Transaction {
  id: string;
  walletId: string;
  amount: string;
  type: "CREDIT";
  status: "PENDING";
  reference: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface GetBalance {
  id: string;
  balance: string;
  totalFunded: string;
  totalSpent: string;
  transactions: Transaction[];
}

type GetBalanceResponse = APIResponse<GetBalance>;

export const wallet = {
  async fundWallet(data: { amount: string; walletId: string }) {
    const res = await apiClient.post(API_ROUTES.wallet.fundWallet, data);
    return res.data;
  },
  async chargeWallet(data: {
    amount: string;
    walletId: string;
    shipmentId: string;
  }) {
    const res = await apiClient.post(API_ROUTES.wallet.fundWallet, data);
    return res.data;
  },
  async getBalance() {
    const res = await apiClient.get<GetBalanceResponse>(
      API_ROUTES.wallet.getBalance,
    );
    return res.data;
  },
};
