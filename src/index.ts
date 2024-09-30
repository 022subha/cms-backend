import { app } from "./app";
import dotenv from "dotenv";
import { connectDB } from "./database";
import { connectToCloudinary } from "./config/cloudinary";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on PORT: ${process.env.PORT}\n`);
    });
    connectToCloudinary();
  })
  .catch((error) => {
    console.error(
      "\n<================ Error in connecting to DB ================>\n",
      error
    );
  });
