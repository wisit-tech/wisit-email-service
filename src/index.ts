// app/index.ts
import express from "express";
import dotenv from "dotenv";
import router from "./routes/index";
import { serveStaticFiles } from "./utility/serveStaticFiles";
dotenv.config({
  path: "../.env",
});

const app = express();
const port = process.env.PORT || 8004;
// app.use('/public', express.static('public'));
serveStaticFiles(app, "/public", "public");


app.get("/", (req, res) => {
  res.send("Hey, Wisit here!");
});

app.use(express.json());

app.use("/api", router);  // Ensure the base route is "/api"

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const all_routes = require("express-list-endpoints");
console.log(all_routes(app));
