import express from "express";
import cors from "cors";
import { db } from "./DB/connect";
import { usersTable } from "./DB/schema";
import { ValidateEmail, ValidateUser } from "./middewares/user.validator";
import insertUser from "./controllers/insertUser";
import getUser from "./controllers/getUser";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello yeild user");
});
app.get("/user/:email", ValidateEmail, getUser);
app.post("/users", ValidateUser, insertUser);

app.listen(8080, () => {
  console.log("server started");
});
