import { SignUpData } from "@/app/(auth)/signup/page";

import { API_ROUTES } from "../api/endpoints";
import { LoginData } from "@/app/(auth)/login/page";
import { createPasswordData } from "@/app/(auth)/create-password/page";
import apiClient from "../api/client";
import { ProfileUpdateData } from "@/components/profile/UpdateProfile";

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

type UpdateProfile = User & {
  verificationCode: string;
  password: string;
  otpExpiresAt: string | null;
};

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface VerifyEmailData {
  verificationCode: string;
  email: string;
}

export interface LogIn {
  user: User;
  token: Tokens;
}

type SignUpRes = APIResponse<User>;

type LogInRes = APIResponse<LogIn>;

type UpdatePasswordData = createPasswordData & { email: string };

type UpdateProfileRes = APIResponse<UpdateProfile>;

export const auth = {
  async SignUp(data: SignUpData) {
    const res = await apiClient.post<SignUpRes>(API_ROUTES.auth.register, data);
    return res.data;
  },

  async verifyEmail(data: VerifyEmailData) {
    const res = await apiClient.post(API_ROUTES.auth.verifyEmail, data);
    return res.data;
  },

  async resendOtp(email: string) {
    const res = await apiClient.post(API_ROUTES.auth.resendOtp, { email });
    return res.data;
  },

  async logIn(data: LoginData) {
    const res = await apiClient.post<LogInRes>(API_ROUTES.auth.login, data);
    return res.data;
  },

  async getUserById(id: string) {
    const res = await apiClient.get<SignUpRes>(API_ROUTES.auth.getUserById(id));
    return res.data;
  },

  async updateProfile(data: ProfileUpdateData) {
    const res = await apiClient.post<UpdateProfileRes>(
      API_ROUTES.auth.updateProfile,
      data
    );
    return res.data;
  },

  async requestPasswordReset(email: { email: string }) {
    const res = await apiClient.post(
      API_ROUTES.auth.requestPasswordReset,
      email
    );
    return res.data;
  },

  async updatePassword(data: UpdatePasswordData) {
    const res = await apiClient.post(API_ROUTES.auth.updatePassword, data);
    return res.data;
  },

  async changePassword(data: UpdatePasswordData) {
    const res = await apiClient.post(API_ROUTES.auth.changePassword, data);
    return res.data;
  },
};
