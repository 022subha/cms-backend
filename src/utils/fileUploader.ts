import {
  v2 as cloudinary,
  UploadApiOptions,
  UploadApiResponse,
} from "cloudinary";
import { UploadOptions } from "../types/uploadFileType";

export const uploadFile = async ({
  file,
  folder,
  height,
  quality,
}: UploadOptions): Promise<UploadApiResponse> => {
  const options: UploadApiOptions = {
    folder,
    resource_type: "auto",
    ...(height && { height }),
    ...(quality && { quality }),
  };

  return await cloudinary.uploader.upload(file.tempFilePath, options);
};
