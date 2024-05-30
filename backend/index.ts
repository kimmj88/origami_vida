// server/index.js
import express from "express";
const cors = require("cors");
const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://localhost:9000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express server!");
  console.log("kimminjae");
});

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
