import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { SERVICE_ENDPOINT } from "../utils/constants"; // Import the constant for the service endpoint

// Define the Swagger API specifications
const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // Swagger 3.0
    info: {
      title: "Wisit Services",
      version: "1.0.0",
      description: "API documentation for Wisit external services",
      contact: {
        name: "API Support",
        email: "wisit-tech@wisit.in",
      },
    },
    servers: [
      {
        url: `${SERVICE_ENDPOINT || "http://localhost:8004"}/api`, // Base URL for the service endpoint
      },
    ],
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
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key", // Name of the header expected in requests
          description:
            "API key needed to access the endpoints. Use the 'x-api-key' header to provide the API key.",
        },
      },
    },
    security: [
      {
        ApiKeyAuth: [], // Apply API key authentication globally
      },
    ],
  },
  apis: ["src/routes/**/*.ts"], // Path to your API routes for JSDoc annotations
};

// Generate Swagger specification
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Function to set up Swagger UI
export const setupSwagger = (app: any) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default swaggerSpec;
