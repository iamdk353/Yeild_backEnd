import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { ErrorResp } from "../utils/create.error.obj";
import { emailvalidation } from "./user.validator";
export const ValidateProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productValidator = z.object({
    farmerId: z.string().email().nullable().default(null),
    buyerId: z.string().email(),
    quantity: z.number().positive(),
    productName: z.string().nonempty(),
    price: z.number().positive(),
    deliveryDate: z.string().refine(
      (date) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(date)) {
          return false;
        }
        const [year, month, day] = date.split("-").map(Number);
        const deliveryDate = new Date(year, month - 1, day); // Month is 0-indexed
        const today = new Date();

        today.setHours(0, 0, 0, 0);
        deliveryDate.setHours(0, 0, 0, 0);
        const oneMonthAhead = new Date(today);
        oneMonthAhead.setMonth(today.getMonth() + 1);

        return deliveryDate >= oneMonthAhead;
      },
      {
        message:
          "Delivery date must be in YYYY-MM-DD format and at least one month ahead",
      }
    ),
  });
  const result = productValidator.safeParse(req.body);
  if (!result.success) {
    console.log(result.error);
    res.status(400).json(ErrorResp(400, result.error));
  } else next();
};

export const validateAcceptProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const acceptProductValidator = z.object({
    email: emailvalidation,
    id: z.number().nonnegative(),
  });
  const result = acceptProductValidator.safeParse(req.body);
  if (!result.success) {
    res.status(400).json(ErrorResp(400, result.error));
  } else {
    next();
  }
};
