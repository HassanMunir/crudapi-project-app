const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/product.route.js");
const app = express();

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
      "mongodb+srv://${{ process.env.MONGODB_USERNAME }}:${{ process.env.MONGODB_PASSWORD }}@nodejscluster-project.dus5d.mongodb.net/?retryWrites=true&w=majority&appName=nodejscluster-project",
    )
    .then(() => {
      console.log("Connected to database!");
      app.listen(3000, () => {
        console.log("Server is running on port 3000");
      });
    })
    .catch((err) => console.error(err));
}
