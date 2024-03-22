const express = require("express");
const app = express();
const globalErrorHandler = require("./controller/errorController");
const bodyParser = require("body-parser");
const userRouter = require("./Router/userRouter");
const orderRouter = require("./Router/orderRoutes");
const contactRouter = require("./Router/contactRouter");
const FundsRouter = require("./Router/AddFundRoute");
const viewRouoter = require("./Router/viewRoute");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const authController = require("./controller/authenticationController");
const AppError = require("./utils/appError");
const fs = require("fs");
var cors = require("cors");
const path = require("path");
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(compression());
// app.use(express.json({limit: '10kb'}));
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, 'css')));
// app.use(express.static(path.join(__dirname, 'js')));
// app.use('/' , viewRouter)
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(authController.isLoggedIn);
app.use("/", viewRouoter);
// app.use('/admin-panel' , viewRouoter.adminPanel)
app.use("/api/v1/users", userRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/AddFund", FundsRouter);
app.use("/api/v1/contact", contactRouter);
app.all("*", (req, res, next) => {
  console.log(req.originalUrl);
  next(
    new AppError(`server cannot find ${req.originalUrl} on this server`, 400)
  );
});

app.use(globalErrorHandler);
module.exports = app;
