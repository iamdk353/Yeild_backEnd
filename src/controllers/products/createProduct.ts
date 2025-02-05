import { Request, Response } from "express";
import { successResp } from "../../utils/success.obj";
import HandleAsync from "../../middewares/handle.Async";
import { db } from "../../DB/connect";
import { productsTable } from "../../DB/schema";

const createProduct = HandleAsync(async (req: Request, res: Response) => {
  const product = req.body;
  await db.insert(productsTable).values(product);
  res.json(successResp("contract added"));
});
export default createProduct;
