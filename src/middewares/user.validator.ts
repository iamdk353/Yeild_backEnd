import { NextFunction, Request, Response } from "express";
import z from "zod";

export const userValidator = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("email is required"),
  number: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^(\+?[0-9]|\d)[0-9]{1,14}$/, "Invalid phone number format"),
  location: z.string().min(1, "Location is required"),
  userType: z.enum(["farmer", "buyer"], {
    message: "user type can be either farmer or buyer",
  }),
});

export const ValidateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = userValidator.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ code: 400, msg: result.error.issues[0].message });
  } else {
    next();
  }
};

export const emailvalidation = z.string().email("Invalid email format");
export const ValidateEmail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = emailvalidation.safeParse(req.params.email);
  if (!result.success) {
    res.status(400).json({ code: 400, msg: result.error.issues[0].message });
  } else {
    next();
  }
};
