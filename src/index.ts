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
  ValidateProduct,
} from "./middewares/product.validator";
import acceptProduct from "./controllers/products/acceptProduct";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello yeild user");
});
app.get("/user/:email", ValidateEmail, getUser);
app.post("/users", ValidateUser, insertUser);
app.get("/products", validateProdQuery, getProducts);
app.post("/products", ValidateProduct, createProduct);
app.patch("/product-accept", validateAcceptProduct, acceptProduct);

app.listen(8080, () => {
  console.log("server started");
});
