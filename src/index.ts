import express from "express";
import cors from "cors";
import { db } from "./DB/connect";
import { usersTable } from "./DB/schema";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello yeild user");
});
app.get("/users", async (req, res) => {
  const result = await db.select().from(usersTable);
  res.json(result);
});
app.listen(8080, () => {
  console.log("server started");
});
