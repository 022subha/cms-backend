import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./controllers/error";
import morgan from "morgan";
import { ErrorHandler } from "./utils/errorHandler";
import fileUpload from "express-fileupload";

export const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

app.use(morgan("dev"));

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Server is ready",
    status: "success",
    timestamp: new Date().toISOString(),
  });
});

app.all("*", (req: Request, _res: Response, next: NextFunction) => {
  next(new ErrorHandler(404, `Route ${req.originalUrl} not found`));
});

app.use(errorMiddleware);
