import e, { Request, Response } from "express";
import { db } from "../DB/connect";
import { usersTable } from "../DB/schema";

// import { NeonDbError } from "@neondatabase/serverless";

const insertUser = async (req: Request, res: Response) => {
  const data = await db.insert(usersTable).values(req.body);
  console.log(data);
  res.json({ code: 200, msg: "user Added to DB" });
};
export default insertUser;
