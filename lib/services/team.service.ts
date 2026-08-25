import { InviteData } from "@/components/settings/team/AddMemberModal";
import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import { APIResponse } from "./auth.service";

interface TeamMember {
  id: string;
  fullName: string;
  username: string;
  email: string;
  role: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

type TeamMembers = APIResponse<TeamMember[]>;

export const team = {
  async getTeamMembers() {
    const res = await apiClient.get<TeamMembers>(
      API_ROUTES.team.getTeamMembers,
    );
    return res.data;
  },

  async inviteMember(data: InviteData) {
    const res = await apiClient.post<APIResponse<null>>(
      API_ROUTES.team.inviteMember,
      data,
    );
    return res.data;
  },
};
