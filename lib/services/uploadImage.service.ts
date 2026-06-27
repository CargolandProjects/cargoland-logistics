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

    // const controller = new AbortController();

    // 👇 manual timeout (fetch doesn’t support it natively)
    // const timeoutId = setTimeout(() => {
    //   controller.abort();
    // }, 60000); // 60s

    try {
      const res = await fetch(API_ROUTES.image.upload, {
        method: "POST",
        body: formData,
        // signal: controller.signal,
        // ❌ DO NOT set Content-Type (browser handles it for FormData)
      });

      if (!res.ok) {
        throw new Error(`Upload failed: ${res.status}`);
      }

      const data: UploadResponse = await res.json();
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.name === "AbortError") {
        throw new Error("Upload timed out");
      }
      throw err;
    }
  },

  async delete(publicId: string) {
    const res = await apiClient.delete(`${API_ROUTES.image.delete(publicId)}`);
    return res.data;
  },
};
