import mongoose from "mongoose";
import { DB_NAME } from "../constants";
import { app } from "../app";

export const connectDB = async () => {
  if (!process.env.MONGODB_URI || !DB_NAME) {
    console.error(
      "MONGODB_URI and DB_NAME must be defined in environment variables."
    );
    process.exit(1);
  }

  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    console.log(`\nMONGODB Connected: ${connectionInstance.connection.host}`);

    app.on("close", async () => {
      await connectionInstance.connection.close();
      console.log("MONGODB Connection Closed");
      process.exit(0);
    });
  } catch (error) {
    console.error(
      "\n<================ MONGODB Connection Failed ================>\n",
      error
    );
    process.exit(1);
  }
};
