import { team } from "@/lib/services/team.service";
import { useQuery } from "@tanstack/react-query";

export const useGetTeamMembers = () => {
  return useQuery({
    queryKey: ["teamMembers"],
    queryFn: team.getTeamMembers,
    select: (res) => res.data,
  });
};
