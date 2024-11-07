// app/index.ts
import express from "express";
import dotenv from "dotenv";
import router from "./routes/index";
import { serveStaticFiles } from "./utils/serveStaticFiles";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/swagger.json";
// import { setupSwagger } from "./utils/swagger";
dotenv.config({
  path: "../.env",
});

const app = express();
const port = process.env.PORT || 8004;
serveStaticFiles(app, "/public", "public");

app.get("/", (req, res) => {
  res.send("Hey, Wisit here!");
});

// Middlewares
app.use(express.json());

// Set up Swagger API documentation
// setupSwagger(app);

// Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", router);
// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
const all_routes = require("express-list-endpoints");
console.log(all_routes(app));
