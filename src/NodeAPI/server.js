const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = require("./app/models");
db.sequelize.sync();

app.get("/", (req, res) => {
    res.json({ message: "Node API working!" });
});

require("./app/routes/client.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});