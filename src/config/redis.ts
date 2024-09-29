import { Redis } from "ioredis";

const redisClient = (): string => {
  if (process.env.REDIS_URI) {
    console.log("Redis Connected");
    return process.env.REDIS_URI;
  }

  throw new Error("Redis Connection Failed");
};

export const redis = new Redis(redisClient());
