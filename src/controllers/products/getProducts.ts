import { Request, Response } from "express";
import HandleAsync from "../../middewares/handle.Async";
import { db } from "../../DB/connect";
import { productsTable } from "../../DB/schema";

import { ErrorResp } from "../../utils/create.error.obj";
import { eq, not } from "drizzle-orm";

const getProducts = HandleAsync(async (req: Request, res: Response) => {
  const data = await db
    .select()
    .from(productsTable)
    .where(not(eq(productsTable.isAccepted, true)));
  if (data.length === 0) {
    res.json(data);
    return;
  }
  res.json({ code: 200, msg: data });
});
export default getProducts;
