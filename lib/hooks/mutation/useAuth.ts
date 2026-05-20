import { auth } from "@/lib/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useSignUp = () => {
  return useMutation({
    mutationFn: auth.SignUp,
  });
};
