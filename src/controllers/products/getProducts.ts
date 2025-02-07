import { Request, Response } from "express";
import HandleAsync from "../../middewares/handle.Async";
import { db } from "../../DB/connect";
import { productsTable, usersTable } from "../../DB/schema";

import { ErrorResp } from "../../utils/create.error.obj";
import { eq, isNull, not } from "drizzle-orm";
import { successResp } from "../../utils/success.obj";

const getProducts = HandleAsync(async (req: Request, res: Response) => {
  const data = await db
    .select({
      productId: productsTable.productId,
      productName: productsTable.productName,
      price: productsTable.price,
      quantity: productsTable.quantity,
      buyerId: productsTable.buyerId,
      deliveryDate: productsTable.deliveryDate,
      buyerName: usersTable.name,
    })
    .from(productsTable)
    .where(isNull(productsTable.farmerId))
    .leftJoin(usersTable, eq(productsTable.buyerId, usersTable.email));
  if (data.length !== 0) {
    res.json(data.reverse());
    return;
  }
  res.json(successResp("no contracts in DB"));
});
export default getProducts;
