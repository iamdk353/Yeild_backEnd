import { NextFunction, Request, Response } from "express";
import { number, z } from "zod";

const productSchema = z
  .object({
    buyerId: z.string().nullable().optional(),
    productName: z.string().nullable().optional(),
    minPrice: z.string().nullable().optional(),
    maxPrice: z.string().nullable().optional(),
  })
  .strict();

export const validateProdQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = productSchema.safeParse(req.query);
  if (!result.success) {
    res.status(400).json({ code: 400, msg: result.error.issues[0].message });
  } else {
    next();
  }
};
