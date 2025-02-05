import { Request, Response } from "express";
import { successResp } from "../../utils/success.obj";
import HandleAsync from "../../middewares/handle.Async";
import { db } from "../../DB/connect";
import { productsTable, usersTable } from "../../DB/schema";
import { and, eq, not } from "drizzle-orm";
import { ErrorResp } from "../../utils/create.error.obj";

const acceptProduct = HandleAsync(async (req: Request, res: Response) => {
  const farmerEmail = req.body.email;
  const id = req.body.id;
  const farmer = await db
    .select({ email: usersTable.email })
    .from(usersTable)
    .where(
      and(eq(usersTable.email, farmerEmail), eq(usersTable.userType, "farmer"))
    );
  if (farmer.length > 0) {
    const resp = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.productId, id));
    if (resp.length !== 0) {
      await db.update(productsTable).set({
        farmerId: farmerEmail,
        isAccepted: true,
      });
    } else {
      res.json(ErrorResp(404, "product not found "));
      return;
    }
    res.json(successResp("accepted Contract"));
    return;
  } else {
    res.json(ErrorResp(404, "farmer not found"));
    return;
  }
});

export default acceptProduct;
