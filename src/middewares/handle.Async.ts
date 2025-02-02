import { NeonDbError } from "@neondatabase/serverless";
import { NextFunction, Request, Response } from "express";
import { ErrorResp } from "../utils/create.error.obj";

const HandleAsync = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      if (error instanceof NeonDbError) {
        res.status(400).json(ErrorResp(400, `DB error: ${error.message}`));
        return;
      }
      res
        .status(500)
        .json(ErrorResp(undefined, "Internal server error, please try again"));
    }
  };
};

export default HandleAsync;
