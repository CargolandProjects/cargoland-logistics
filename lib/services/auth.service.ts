import { SignUpData } from "@/app/(auth)/signup/page";
import api from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import { LoginData } from "@/app/(auth)/signin/page";
import { createPasswordData } from "@/app/(auth)/create-password/page";

export type APIResponse<T> = {
  status: string;
  message: string;
  data: T;
};

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  isActive: boolean;
  termsAndCondition: boolean;
  otpVerifiedAt: string | null;
  role: "USER";
  createdAt: string;
  updatedAt: string;
}

interface VerifyEmailData {
  verificationCode: string;
  email: string;
}

interface SignIn {
  user: User;
  token: {
    accessToken: string;
    refreshToken: string;
  };
}

type SignUpRes = APIResponse<User>;

type SignInRes = APIResponse<SignIn>;

type UpdatePasswordData = createPasswordData & { email: string };

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

  async signIn(data: LoginData) {
    const res = await api.post<SignInRes>(API_ROUTES.auth.login, data);
    return res.data;
  },

  async getUserById(id: string) {
    const res = await api.get<SignUpRes>(API_ROUTES.auth.getUserById(id));
    return res.data;
  },

  async requestPasswordReset(email: { email: string }) {
    const res = await api.post(API_ROUTES.auth.requestPasswordReset, email);
    return res.data;
  },

  async updatePassword(data: UpdatePasswordData) {
    const res = await api.post(API_ROUTES.auth.updatePassword, data);
    return res.data;
  },
};
