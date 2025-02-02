import express from "express";
import cors from "cors";
import { db } from "./DB/connect";
import { usersTable } from "./DB/schema";
import { ValidateUser } from "./middewares/user.validator";
import insertUser from "./controllers/insertUser";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello yeild user");
});

app.post("/users", ValidateUser, insertUser);

app.listen(8080, () => {
  console.log("server started");
});
