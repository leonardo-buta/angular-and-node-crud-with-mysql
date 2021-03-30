const express = require("express");
const cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

// Swagger
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      title: "Node API with Express",
      version: "1.0.0",
      description:
        "A REST API for CRUD with Clients model",
      license: {
        name: "Licensed Under MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Buta",
        url: "https://github.com/leonardo-buta",
      },
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Localhost",
      },
    ],
  };
  
  const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ["./app/routes/*.js"],
  };
  
const swaggerSpec = swaggerJSDoc(options);


app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const db = require("./app/models");
db.sequelize.sync();



app.get("/", (req, res) => {
    res.json({ message: "Node API working!" });
});

// Routing
require("./app/routes/client.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
