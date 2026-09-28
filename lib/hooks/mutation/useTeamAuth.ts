import { team } from "@/lib/services/team.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useInviteMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: team.inviteMember,
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useTeamLogin = () => {
  return useMutation({
    mutationFn: team.teamLogin,
  });
};

export const useRemoveTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: team.removeTeamMember,
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ["teamMembers"] });
    },
    onError: (res) => {
      toast.error(res.message);
    },
  });
};
