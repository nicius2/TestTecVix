import { Response } from "express";
import path from "path";
import { z } from "zod";

import { CustomRequest } from "../types/custom";
import { STATUS_CODE } from "../constants/statusCode";
import { IBucketService } from "../types/Interfaces/IBucketService";

const paramsSchema = z.object({
  objectName: z.string().min(1, "objectName is required"),
});

export class BucketController {
  constructor(private bucketService: IBucketService) {}

  async getFileInBucketByObjectName(
    req: CustomRequest<unknown>,
    res: Response,
  ) {
    try {
      const { objectName } = paramsSchema.parse(req.params);

      const filePath = path.join(
        __dirname,
        "..",
        "..",
        "uploads",
        objectName,
      );

      return res.sendFile(filePath);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(STATUS_CODE.BAD_REQUEST)
          .json({ errors: error.errors });
      }

      return res
        .status(STATUS_CODE.SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }

  async getFileByObjectName(
    req: CustomRequest<unknown>,
    res: Response,
  ) {
    try {
      const { objectName } = paramsSchema.parse(req.params);

      const response =
        await this.bucketService.renewPresignedUrl(objectName);

      return res.status(STATUS_CODE.OK).json({ url: response });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(STATUS_CODE.BAD_REQUEST)
          .json({ errors: error.errors });
      }

      return res
        .status(STATUS_CODE.SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }

  async uploadFile(req: CustomRequest<unknown>, res: Response) {
    try {
      const file = req.file;

      if (!file) {
        return res
          .status(STATUS_CODE.BAD_REQUEST)
          .json({ message: "No file uploaded" });
      }

      const response = await this.bucketService.uploadFile(
        process.env.MINIO_BUCKET as string,
        file,
      );

      return res.status(STATUS_CODE.OK).json(response);
    } catch (error) {
      return res
        .status(STATUS_CODE.SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }
}
