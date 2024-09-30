import { v2 as cloudinary, ConfigOptions } from "cloudinary";

export const connectToCloudinary = (): void => {
  try {
    const config: ConfigOptions = {
      cloud_name: process.env.CLOUDINARY_NAME as string,
      api_key: process.env.CLOUDINARY_API_KEY as string,
      api_secret: process.env.CLOUDINARY_API_SECRET as string,
    };

    cloudinary.config(config);
    console.log(`Cloudinary Connected successfully.`);
  } catch (error) {
    console.error(
      "\n<================ Error in connecting to Cloudinary ================>\n",
      error
    );
  }
};
