import { InviteData } from "@/components/settings/team/AddMemberModal";
import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";
import { APIResponse } from "./auth.service";

export const team = {
  async getTeamMembers() {
    const res = await apiClient.get(API_ROUTES.team.getTeamMembers);
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
