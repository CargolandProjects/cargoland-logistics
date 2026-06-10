import { auth } from "@/lib/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "../useSession";

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

export const useUpdateProfile = () => {
  const { session, setUser } = useSession();
  return useMutation({
    mutationFn: auth.updateProfile,
    onSuccess: async (res) => {
      if (res.data) {
        const {
          otpExpiresAt: _otpExpiresAt,
          verificationCode: _verificationCode,
          password: _password,
          ...userData
        } = res.data;
        await setUser({...session, ...userData});
      }
    },
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
export const useChangePassword = () => {
  return useMutation({
    mutationFn: auth.changePassword,
  });
};
