import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello yeild user");
});
app.listen(8080, () => {
  console.log("server started");
});
