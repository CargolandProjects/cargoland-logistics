import { team } from "@/lib/services/team.service";
import { useMutation } from "@tanstack/react-query";

export const useInviteMember = () => {
  return useMutation({
    mutationFn: team.inviteMember,
  });
};
