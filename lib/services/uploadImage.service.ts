import apiClient from "../api/client";
import { API_ROUTES } from "../api/endpoints";

interface UploadResponse {
  message: string;
  url: string;
  publicId: string;
}

export const image = {
  async upload({ file, userEmail }: { file: File; userEmail: string }) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userEmail", userEmail);

    const res = await apiClient.post<UploadResponse>(
      API_ROUTES.image.upload,
      formData,
      // Override global JSON header; undefined lets Axios auto-set multipart/form-data with boundary
      { headers: { "Content-Type": undefined } },
    );

    return res.data;
  },

  async delete(publicId: string) {
    const res = await apiClient.delete(`${API_ROUTES.image.delete(publicId)}`);
    return res.data;
  },
};
