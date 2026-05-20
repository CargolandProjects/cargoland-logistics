import { SignUpData } from "@/app/(auth)/signup/page";
import api from "../api/client";
import { API_ROUTES } from "../api/endpoints";

export type APIResponse<T> = {
  status: string;
  message: string;
  data: T;
};

export interface SignUp {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  isActive: boolean;
  termsAndCondition: boolean;
  otpVerifiedAt: null;
  role: "USER";
  createdAt: string;
  updatedAt: string;
}

interface VerifyEmailData {
  verificationCode: string;
  email: string;
}

type SignUpRes = APIResponse<SignUp>;

export const auth = {
  async SignUp(data: SignUpData) {
    const res = await api.post<SignUpRes>(API_ROUTES.auth.register, data);
    return res.data;
  },

  async verifyEmail(data: VerifyEmailData) {
    const res = await api.post(API_ROUTES.auth.verifyEmail, data);
    return res.data;
  },

  async resendOtp(email: string) {
    const res = await api.post(API_ROUTES.auth.resendOtp, { email });
    return res.data;
  },
};
