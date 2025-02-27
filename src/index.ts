import express from "express";
import cors from "cors";

import { ValidateEmail, ValidateUser } from "./middewares/user.validator";
import insertUser from "./controllers/insertUser";
import getUser from "./controllers/getUser";
import { validateProdQuery } from "./middewares/prodQuey.validator";
import getProducts from "./controllers/products/getProducts";
import createProduct from "./controllers/products/createProduct";
import {
  validateAcceptProduct,
  validateGetMyProducts,
  ValidateProduct,
} from "./middewares/product.validator";
import acceptProduct from "./controllers/products/acceptProduct";
import getAproducts from "./controllers/products/getAproducts";
import getMyProducts from "./controllers/products/mycontracts";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello yeild user");
});
app.get("/user/:email", ValidateEmail, getUser);
app.post("/users", ValidateUser, insertUser);
app.get("/products", getProducts);
app.get("/product/:id", getAproducts);
app.post("/getproducts", validateGetMyProducts, getMyProducts);
app.post("/products", ValidateProduct, createProduct);
app.patch("/product-accept", validateAcceptProduct, acceptProduct);

app.listen(8080, () => {
  console.log("server started");
});
