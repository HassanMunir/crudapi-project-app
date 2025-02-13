const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/product.route.js");
const app = express();

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

module.exports = app;

if (require.main === module) {
  mongoose
    .connect(
      `mongodb+srv://hassan:i2PTwtbe6FGIu4HH@nodejscluster-project.dus5d.mongodb.net/?retryWrites=true&w=majority&appName=nodejscluster-project`,
    )
    .then(() => {
      console.log("Connected to database!");
      app.listen(3000, () => {
        console.log("Server is running on port 3000");
      });
    })
    .catch((err) => console.error(err));
}
