import { image } from "@/lib/services/uploadImage.service";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUploadImage = () => {
  return useMutation({
    mutationFn: image.upload,
    // onSuccess: (data) => {
    //   toast.success(data.message || "Image upload successful");
    // },
    onError: (error) => {
      toast.error(error.message || "Image upload failed");
    },
  });
};

export const useDeleteImage = () => {
  return useMutation({
    mutationFn: image.delete,
    onSuccess: () => {
      toast.success("Image deleted");
    },
    onError: () => {
      toast.error("failed to delete image");
    },
  });
};
