// app/index.ts
import express from "express";
import dotenv from "dotenv";
import router from "./routes";
dotenv.config({
  path: "../.env",
});

const app = express();
const port = process.env.PORT || 8004;

app.get("/", (req, res) => {
  res.send("Hello, TypeScript Node.js App!");
});

app.use(express.json());

app.use("/api", router);  // Ensure the base route is "/api"

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const all_routes = require("express-list-endpoints");
console.log(all_routes(app));
console.log(router.stack.map(r => r.route?.path || r.name));
