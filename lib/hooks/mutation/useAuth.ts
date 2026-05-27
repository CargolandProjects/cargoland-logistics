import { auth } from "@/lib/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useSignUp = () => {
  return useMutation({
    mutationFn: auth.SignUp,
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: auth.verifyEmail,
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: auth.resendOtp,
  });
};

export const useLogIn = () => {
  return useMutation({
    mutationFn: auth.logIn,
  });
};

export const useRequestPassword = () => {
  return useMutation({
    mutationFn: auth.requestPasswordReset,
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: auth.updatePassword,
  });
};
