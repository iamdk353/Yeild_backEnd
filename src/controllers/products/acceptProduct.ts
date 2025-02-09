import { Request, Response } from "express";
import { successResp } from "../../utils/success.obj";
import HandleAsync from "../../middewares/handle.Async";
import { db } from "../../DB/connect";
import { productsTable } from "../../DB/schema";
import { eq } from "drizzle-orm";
const acceptProduct = HandleAsync(async (req: Request, res: Response) => {
  const { id, farmerTerms, email } = req.body;
  const data = await db
    .update(productsTable)
    .set({
      BuyerAccepted: true,
      farmerId: email,
      farmerAccepted: true,
      farmerTerms,
    })
    .where(eq(productsTable.productId, id));

  res.json(successResp("update successfull", 201));
});

export default acceptProduct;
