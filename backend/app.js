const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");

const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());

// Route Imports
const drug = require("./routes/drugRoute");
const drugPrice = require("./routes/drugPriceRoute");
const drugCategory = require("./routes/drugCategoryRoute");
const device = require("./routes/deviceRoute");
const devicePrice = require("./routes/devicePriceRoute");
const deviceCategory = require("./routes/deviceCategoryRoute");
const product = require("./routes/productRoute");
const productCategory = require("./routes/productCategoryRoute");
const productPrice = require("./routes/productPriceRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const orderItem = require("./routes/orderItemRoute");
const payment = require("./routes/paymentRoute");
const zone = require("./routes/zoneRoute");
const pinAmount = require("./routes/pinAmountRoute");
const chemical = require("./routes/chemicalRoute");
const disease = require("./routes/diseaseRoute");
const employee = require("./routes/employeeRoute");

app.use("/api/v1", drug);
app.use("/api/v1", drugPrice);
app.use("/api/v1", drugCategory);
app.use("/api/v1", device);
app.use("/api/v1", devicePrice);
app.use("/api/v1", deviceCategory);
app.use("/api/v1", product);
app.use("/api/v1", productPrice);
app.use("/api/v1", productCategory);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", orderItem);
app.use("/api/v1", payment);
app.use("/api/v1", zone);
app.use("/api/v1", pinAmount);
app.use("/api/v1", chemical);
app.use("/api/v1", disease);
app.use("/api/v1", employee);

// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
