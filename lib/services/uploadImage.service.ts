import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";

export interface UploadResponse {
  message: string;
  url: string;
  publicId: string;
}

export interface Upload {
  file: File;
  userEmail: string;
}

export const image = {
  async upload({ file, userEmail }: Upload) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userEmail", userEmail);

    const res = await apiClient.post<UploadResponse>(
      API_ROUTES.image.upload,
      formData,
      // Override global JSON header; undefined lets Axios auto-set multipart/form-data with boundary
      { headers: { "Content-Type": undefined }, timeout: 60000 },
    );

    return res.data;
  },

  async delete(publicId: string) {
    const res = await apiClient.delete(`${API_ROUTES.image.delete(publicId)}`);
    return res.data;
  },
};
