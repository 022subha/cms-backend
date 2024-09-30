import { UploadedFile } from "express-fileupload";

export type UploadOptions = {
  file: UploadedFile;
  folder: string;
  height?: number;
  quality?: string;
};
