import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import { APIResponse } from "./auth.service";

export interface Transaction {
  id: string;
  walletId: string;
  amount: string;
  type: "CREDIT";
  status: "SUCCESS" | "FAILED";
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

interface MakePayment {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export type MakePaymentRes = APIResponse<MakePayment>;
type GetBalanceResponse = APIResponse<GetBalance>;

export const wallet = {
  async fundWallet(data: { amount: string; walletId: string }) {
    const res = await apiClient.post<MakePaymentRes>(
      API_ROUTES.wallet.fundWallet,
      data,
    );
    return res.data;
  },
  async chargeWallet(data: { amount: string; shipmentId: string }) {
    const res = await apiClient.post(API_ROUTES.wallet.chargeWallet, data);
    return res.data;
  },
  async getBalance() {
    const res = await apiClient.get<GetBalanceResponse>(
      API_ROUTES.wallet.getBalance,
    );
    return res.data;
  },
};
