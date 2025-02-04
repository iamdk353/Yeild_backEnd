import { Request, Response } from "express";
import { db } from "../DB/connect";
import { usersTable } from "../DB/schema";
import HandleAsync from "../middewares/handle.Async";

const insertUser = HandleAsync(async (req: Request, res: Response) => {
  const data = await db
    .insert(usersTable)
    .values({ ...req.body, onboarded: true });
  // console.log(data);.
  res.json({ code: 200, msg: "User added to DB" });
});

export default insertUser;
