// app/index.ts
import express from "express";
import dotenv from "dotenv";
import router from "./routes/index";
import { serveStaticFiles } from "./utils/serveStaticFiles";
dotenv.config({
  path: "../.env",
});

const app = express();
const port = process.env.PORT || 8004;
serveStaticFiles(app, "/public", "public");

app.get("/", (req, res) => {
  res.send("Hey, Wisit here!");
});

app.use(express.json());

// Set up Swagger API documentation
// setupSwagger(app);

// Routes
app.use("/api", router);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const all_routes = require("express-list-endpoints");
console.log(all_routes(app));
