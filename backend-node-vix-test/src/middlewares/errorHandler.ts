import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const errorHandler = (
  err:
    | AppError
    | ZodError
    | {
        status?: number;
      },
  _req: Request,
  res: Response,

  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    const { status, message } = err;
    return res.status(status).json({ message });
  }
  if (err instanceof ZodError) {
    return res
      .status(400)
      .json({ message: err.issues.map((issue) => issue.message).join(",\n ") });
  }

  if (err instanceof PrismaClientKnownRequestError) {
    return res.status(400).json(err);
  }

  // Fallback for unknown errors (500)
  const status = (err as any).status || 500;
  const message = (err as any).message || "Internal Server Error";
  console.error("Global Error Handler:", err); // Ensure it's logged on server too

  return res.status(status).json({
    status,
    message,
    stack: process.env.NODE_ENV === "development" ? (err as any).stack : undefined,
    raw: err,
  });
};
