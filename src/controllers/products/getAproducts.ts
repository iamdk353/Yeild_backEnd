import { Request, Response } from "express";
import { z } from "zod";
import { ErrorResp } from "../../utils/create.error.obj";
import HandleAsync from "../../middewares/handle.Async";
import { db } from "../../DB/connect";
import { productsTable } from "../../DB/schema";
import { eq } from "drizzle-orm";
import { successResp } from "../../utils/success.obj";

const getAproducts = HandleAsync(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const validateId = z.number().nonnegative();
  const validation = validateId.safeParse(id);
  if (validation.error) {
    res.json(ErrorResp(400, validation.error));
    return;
  }

  const resp = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.productId, id));
  if (resp.length === 0) {
    res.status(404).json(ErrorResp(404, "product not found"));
    return;
  }
  res.json(successResp(resp, 200));
});
export default getAproducts;
