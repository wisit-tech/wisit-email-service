const generateSwagger = require("swagger-autogen")();

const options = {
  openapi: "3.0.0", // OpenAPI version
  language: "en-US",
  disableLogs: false,
  autoHeaders: true,
  autoQuery: true,
  autoBody: true,
};

const swaggerDocument = {
  info: {
    version: "1.0.0",
    title: "Wisit Services",
    description: "API documentation for Wisit external services",
    contact: {
      name: "API Support",
      email: "wisit-tech@wisit.in",
    },
  },
  //   host: process.env.HOST || "localhost:3000",
  host: "localhost:8004",
  basePath: "/api",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [
    {
      name: "Mail Services",
      description: "Email sending services using Nodemailer and SES",
    },
    {
      name: "File Upload",
      description: "File upload and management services",
    },
  ],
  securityDefinitions: {},
  definitions: {
    successResponse: {
      code: 200,
      message: "Success",
    },
    errorResponse: {
      code: 500,
      message: "An unexpected error occurred.",
    },
  },
};

const swaggerFile = "./docs/swagger.json"; // Path where swagger.json will be generated
const endpointsFiles = ["./src/routes/index.ts"]; // Path to your main routes file

generateSwagger(swaggerFile, endpointsFiles, swaggerDocument);
