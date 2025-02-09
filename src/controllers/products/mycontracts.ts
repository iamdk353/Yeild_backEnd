import { Request, Response } from "express";
import HandleAsync from "../../middewares/handle.Async";
import { db } from "../../DB/connect";
import { productsTable } from "../../DB/schema";
import { eq } from "drizzle-orm";
import { ErrorResp } from "../../utils/create.error.obj";

const getMyProducts = HandleAsync(async (req: Request, res: Response) => {
  const userTypeCondition =
    req.body.userType === "farmer"
      ? productsTable.farmerId
      : productsTable.buyerId;

  const email = req.body.email;
  const data = await db
    .select({
      productId: productsTable.productId,
      productName: productsTable.productName,
      buyerEmail: productsTable.buyerId,
    })
    .from(productsTable)
    .where(eq(userTypeCondition, email));
  if (data.length !== 0) {
    res.json(data);
    return;
  }
  res.status(404).json(ErrorResp(404, "no contracts"));
});
export default getMyProducts;
