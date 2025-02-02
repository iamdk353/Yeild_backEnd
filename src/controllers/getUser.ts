import { Request, Response } from "express";
import { db } from "../DB/connect";
import { usersTable } from "../DB/schema";
import HandleAsync from "../middewares/handle.Async";
import { cosineDistance, eq } from "drizzle-orm";
import { ErrorResp } from "../utils/create.error.obj";

const getUser = HandleAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const data = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));
  // console.log(data[0]);
  if (data.length === 0) {
    res.status(404).json(ErrorResp(404, "user not found with this email"));
    return;
  }

  res.json({ code: 200, msg: data[0] });
});

export default getUser;
