// app/index.ts
import express from "express";
import dotenv from "dotenv";
import router from "./routes/index";
import { serveStaticFiles } from "./utils/serveStaticFiles";
import { setupSwagger } from "./utils/swagger";
import { SERVICE_ENDPOINT } from "./utils/constants";
dotenv.config({
  path: "../.env",
});

const app = express();
const port = process.env.PORT || 8004;
serveStaticFiles(app, "/public", "public");

app.get("/", (req, res) => {
  res.send("Hey, Wisit here!");
});
// console.log(SERVICE_ENDPOINT)
app.use(express.json());

// Set up Swagger API documentation
setupSwagger(app);

// Routes
app.use("/api", router);
console.log("NODE_ENV:", process.env.IS_PROD);
console.log("Current working directory:", process.cwd());

// console.log("DNS_ENDPOINT:", process.env.DNS_ENDPOINT);

// Start server
app.listen(port, () => {
  console.log(`Server is running on ${SERVICE_ENDPOINT}`);
});

const all_routes = require("express-list-endpoints");
console.log(all_routes(app));
